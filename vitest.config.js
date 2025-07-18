import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'test/**',
        'vitest.config.js',
        '**/*.test.js',
        'coverage/**',
      ],
      thresholds: {
        statements: 70,
        branches: 85,
        functions: 85,
        lines: 70,
      },
    },
  },
});