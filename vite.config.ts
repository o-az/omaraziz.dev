/// <reference types="vite/client" />
/// <reference types="vitest" />

import { resolve } from 'path'
import type { UserConfig, ProxyOptions } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

/** MDX config */
// MDX Plugins
const { default: mdx } = await import('@mdx-js/rollup')
import type { Options as MdxOptions } from '@mdx-js/rollup'
const { default: remarkGfm } = await import('remark-gfm')
import type { Options as RemarkGfmOptions } from 'remark-gfm'
const { remarkMdxFrontmatter } = await import('remark-mdx-frontmatter')
const { default: remarkFrontmatter } = await import('remark-frontmatter')

const { default: rehypeSlugs } = await import('rehype-slug')
// import 'highlight.js'
// const { default: rehypeHighlight } = await import('rehype-highlight')
const { default: rehypeCodeTitles } = await import('rehype-code-titles')
const { default: rehypeAutolinkHeadings } = await import('rehype-autolink-headings')
const { default: rehypePrettyCode } = await import('rehype-pretty-code')
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
const { default: rehypeTheme } = await import('./public/assets/mdx-theme/moonlight-ii.json')

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    dark: JSON.parse(JSON.stringify(rehypeTheme)),
    light: 'github-light',
  },
  tokensMap: {
    fn: 'entity.name.function',
  },
  // getHighlighter: async options => {
  //   const { getHighlighter, BUNDLED_LANGUAGES } = await import('shiki')
  //   return getHighlighter({ ...options, theme: 'one-dark-pro', langs: [...BUNDLED_LANGUAGES] })
  // },
  onVisitLine: node => {
    if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }]
  },
  onVisitHighlightedLine: node => node.properties.className.push('highlighted'),
  onVisitHighlightedWord: node => (node.properties.className = ['word']),
}

const remarkGfmOptions: RemarkGfmOptions = {
  singleTilde: true,
  tablePipeAlign: true,
  stringLength: (str: string) => str.length,
}

const mdxConfig: MdxOptions = {
  jsxImportSource: 'solid-jsx',
  useDynamicImport: true,
  rehypePlugins: [
    // rehypeHighlight,
    [rehypePrettyCode, rehypePrettyCodeOptions],
    rehypeSlugs,
    // [rehypeShiki, { theme: 'nord', useBackground: true }],
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ['anchor'],
        },
      },
    ],
    // rehypeCodeTitles,
  ],
  remarkPlugins: [[remarkGfm, remarkGfmOptions], remarkFrontmatter, remarkMdxFrontmatter],
  development: process.env.NODE_ENV === 'development',
}

/** Overcome CORS pain on localhost */
const viteProxy: Record<string, string | ProxyOptions> = {
  // cloudflare worker
  '/cf-worker': {
    target: 'https://test-cw.0101010.workers.dev',
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace('/cf-worker', ''),
  },
}
/** Vite config */
const config = async (): Promise<UserConfig> => {
  return {
    plugins: [solid(), WindiCSS(), tsconfigPaths(), mdx(mdxConfig)],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: process.env.NODE_ENV ? viteProxy : undefined,
    },
    resolve: {
      alias: {
        '@/': './src',
      },
    },
    optimizeDeps: {
      include: ['solid-js/h/jsx-runtime'],
    },
    build: { target: 'esnext', polyfillDynamicImport: false, rollupOptions: {} },
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
