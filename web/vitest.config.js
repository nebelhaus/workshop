import { defineConfig } from 'vitest/config';

// The worker tests are plain Node unit tests (Node 22 gives us global fetch,
// Request, Response and URL); we stub `fetch` and `caches` per-test. Only the
// worker suite runs — Astro content isn't unit-tested here.
export default defineConfig({
  test: {
    include: ['test/**/*.test.js'],
    environment: 'node',
  },
});
