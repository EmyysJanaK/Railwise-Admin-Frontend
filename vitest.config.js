// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    coverage: {
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'src/setupTests.js'],
    },
  },
});
