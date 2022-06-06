/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import type { UserConfig, ProxyOptions } from 'vite'
import solid from 'vite-plugin-solid'
import mdx from '@mdx-js/rollup'
import { mdxConfig } from './mdx.config'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

const viteProxy: Record<string, string | ProxyOptions> = {
  /** Work with Cloudflare Functions */
  '/api': {
    target: 'http://0.0.0.0:8788/api',
    secure: false,
    changeOrigin: true,
    rewrite: path => path.replace('/api', ''),
    configure: (proxy, options) => {
      proxy.on('error', (error: Error) => {
        options.protocolRewrite = '302'
      })
    },
  },
}

/** Vite config */
const config = async (): Promise<UserConfig> => {
  return {
    plugins: [
      WindiCSS(),
      tsconfigPaths(),
      { ...mdx(mdxConfig), enforce: 'pre' },
      solid({ extensions: ['.mdx', '.md'] }),
    ],
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT || 3000),
      proxy: process.env.NODE_ENV ? viteProxy : undefined,
    },
    preview: { port: Number(process.env.PORT || 3000) + 1 },
    resolve: { alias: { '@/': './src' } },
    optimizeDeps: { include: ['solid-js/h/jsx-runtime'] },
    build: { target: 'esnext', polyfillDynamicImport: false },
    clearScreen: true,
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
