import Fastify from 'fastify';
import { healthResponseSchema } from '@common-ground/shared';

const app = Fastify({ logger: true });
const port = Number(process.env.API_PORT ?? 3001);

app.get('/health', async () =>
  healthResponseSchema.parse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }),
);

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
