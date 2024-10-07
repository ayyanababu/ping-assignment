import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './vitest.setup.ts',
      coverage: {
        reporter: ['text', 'html'], // You can add other reporters if needed
        exclude: ['node_modules/', 'src/types/', 'src/main.ts'] // Exclude files from coverage if needed
      }
    }
  })
)
