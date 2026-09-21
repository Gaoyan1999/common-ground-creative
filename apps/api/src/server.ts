import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Fastify from 'fastify';
import { healthResponseSchema } from '@common-ground/shared';

for (const envPath of [resolve(process.cwd(), '.env'), resolve(process.cwd(), '../../.env')]) {
  if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
    break;
  }
}

const app = Fastify({ logger: true });
const port = Number(process.env.API_PORT ?? 3001);
const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:3000';

app.addContentTypeParser('application/sdp', { parseAs: 'string' }, (_request, body, done) => {
  done(null, body);
});

const setRealtimeCorsHeaders = (reply: { header: (name: string, value: string) => unknown }) => {
  reply.header('Access-Control-Allow-Origin', webOrigin);
  reply.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type');
};

const realtimeEndpoint = () => {
  if (process.env.DASHSCOPE_REALTIME_BASE_URL) {
    return process.env.DASHSCOPE_REALTIME_BASE_URL.replace(/\/$/, '');
  }

  const compatibleUrl = process.env.DASHSCOPE_BASE_URL;
  if (!compatibleUrl) return undefined;

  const { protocol, host } = new URL(compatibleUrl);
  return `${protocol}//${host}/api/v1/webrtc/realtime`;
};

app.get('/health', async () =>
  healthResponseSchema.parse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }),
);

app.options('/realtime/offer', async (_request, reply) => {
  setRealtimeCorsHeaders(reply);
  return reply.code(204).send();
});

app.post('/realtime/offer', async (request, reply) => {
  setRealtimeCorsHeaders(reply);

  const apiKey = process.env.DASHSCOPE_API_KEY;
  const endpoint = realtimeEndpoint();
  const offer = request.body;

  if (!apiKey || !endpoint) {
    return reply.code(503).send({
      message: 'Realtime is not configured. Add DASHSCOPE_API_KEY and DASHSCOPE_BASE_URL to .env.',
    });
  }

  if (typeof offer !== 'string' || offer.length === 0) {
    return reply.code(400).send({ message: 'A WebRTC SDP offer is required.' });
  }

  const model = process.env.DASHSCOPE_REALTIME_MODEL ?? 'qwen3.5-omni-flash-realtime';
  const upstream = await fetch(`${endpoint}?model=${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/sdp',
    },
    body: offer,
  });
  const answer = await upstream.text();

  if (!upstream.ok) {
    request.log.warn({ statusCode: upstream.status }, 'Qwen Realtime offer failed');
    return reply.code(upstream.status).send({
      message: 'Qwen Realtime could not start the call. Confirm the Realtime model is enabled for this workspace.',
    });
  }

  return reply.type('application/sdp').send(answer);
});

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
