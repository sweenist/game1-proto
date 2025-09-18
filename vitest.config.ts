import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: [
      'tests/**/*.spec.ts'
    ],
    exclude: [
      'node_modules',
      'dist'
    ],
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/levels/**',
        'src/*.ts',
        'vite*.ts',
        '**/*.d.ts'
      ]
    }
  },
})