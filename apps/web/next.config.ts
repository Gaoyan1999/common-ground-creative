import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

// The monorepo keeps its local runtime configuration at the repository root.
// Next otherwise only loads .env files from apps/web.
try {
  process.loadEnvFile(fileURLToPath(new URL('../../.env', import.meta.url)));
} catch {
  // Hosted environments provide variables directly instead.
}

const nextConfig: NextConfig = {};

export default nextConfig;
