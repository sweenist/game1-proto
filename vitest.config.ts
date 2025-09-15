import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'tests/**/*.spec.ts'
    ],
    exclude: [
      'node_modules',
      'dist'
    ],
    environment: 'jsdom'
  },
})