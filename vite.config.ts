/// <reference types="vite/client" />
/// <reference types="vitest" />

// Plugins
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const config = async (): Promise<UserConfig> => {
  const { default: mdx } = await import('@mdx-js/rollup')

  return {
    plugins: [
      solid(),
      WindiCSS(),
      tsconfigPaths(),
      mdx({
        remarkPlugins: [],
        jsxImportSource: 'solid-jsx',
        providerImportSource: 'solid-mdx',
      }),
    ],
    server: { host: '0.0.0.0', port: 3000 },
    resolve: {
      alias: {
        '@/': './src',
        '~posts/': './posts',
      },
    },
    optimizeDeps: {
      include: ['solid-js/h/jsx-runtime'],
    },
    build: { minify: true, target: 'esnext', polyfillDynamicImport: false },
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
