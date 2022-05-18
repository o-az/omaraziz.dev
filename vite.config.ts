/// <reference types="vite/client" />
/// <reference types="vitest" />

// Plugins
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const config = async (): Promise<UserConfig> => {
  //
  const { default: mdx } = await import('@mdx-js/rollup')

  return {
    plugins: [react(), WindiCSS(), tsconfigPaths(), mdx({ remarkPlugins: [] })],
    server: { host: '0.0.0.0', port: 3000 },
    resolve: {
      alias: {
        '@/': './src',
        '~blog/': './data/blog',
      },
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    build: { minify: true },
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
