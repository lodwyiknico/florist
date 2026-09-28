import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
      exclude: [
        'node_modules/**',
        'src/tests/**',
        '**/*.config.*',
        '**/index.ts',
        'src/app/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@domain': new URL('./src/domain', import.meta.url).pathname,
      '@features': new URL('./src/features', import.meta.url).pathname,
      '@infrastructure': new URL('./src/infrastructure', import.meta.url).pathname,
      '@presentation': new URL('./src/presentation', import.meta.url).pathname,
      '@shared': new URL('./src/shared', import.meta.url).pathname,
      '@security': new URL('./src/security', import.meta.url).pathname,
    },
  },
})
