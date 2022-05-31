/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import type { UserConfig, ProxyOptions } from 'vite'
import solid from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

/** MDX config */
// MDX Plugins
const { default: mdx } = await import('@mdx-js/rollup')
import type { Options as MdxOptions } from '@mdx-js/rollup'
const { default: remarkGfm } = await import('remark-gfm')
import type { Options as RemarkGfmOptions } from 'remark-gfm'
const { default: remarkMdx } = await import('remark-mdx')
const { default: remarkMath } = await import('remark-math')
const { default: remarkDirective } = await import('remark-directive')
const { default: rehypeSanitize } = await import('rehype-sanitize')
const { default: rehypeMeta } = await import('rehype-meta')
const { default: rehypeCodeTitles } = await import('rehype-code-titles')
const { default: rehypeInferTitleMeta } = await import('rehype-infer-title-meta')
const { default: rehypeInferDescriptionMeta } = await import('rehype-infer-description-meta')
const { default: rehypeInferReadingTimeMeta } = await import('rehype-infer-reading-time-meta')
const { default: rehypeSlugs } = await import('rehype-slug')
const { default: rehypeMathjax } = await import('rehype-mathjax')
const { remarkMdxFrontmatter } = await import('remark-mdx-frontmatter')
const { default: remarkFrontmatter } = await import('remark-frontmatter')
const { default: rehypePrettyCode } = await import('rehype-pretty-code')
const { default: rehypeAutolinkHeadings } = await import('rehype-autolink-headings')
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
  useDynamicImport: true,
  jsxImportSource: 'solid-jsx',
  providerImportSource: 'solid-mdx',
  development: process.env.NODE_ENV === 'development',
  remarkPlugins: [
    [remarkGfm, remarkGfmOptions],
    remarkMdx,
    [remarkFrontmatter, 'yaml'],
    remarkMdxFrontmatter,
    remarkMath,
    remarkDirective,
  ],
  rehypePlugins: [
    // rehype,
    rehypeMeta,
    rehypeSlugs,
    rehypeMathjax,
    // rehypeSanitize,
    rehypeCodeTitles,
    rehypeInferTitleMeta,
    rehypeInferDescriptionMeta,
    rehypeInferReadingTimeMeta,
    [rehypePrettyCode, rehypePrettyCodeOptions],
    [
      rehypeAutolinkHeadings,
      {
        // behavior: 'wrap',
        properties: { className: ['heading'] },
      },
    ],
  ],
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
      // headers: {},
    },
    preview: { port: Number(process.env.PORT || 3000) + 1 },
    resolve: {
      alias: {
        '@/': './src',
        'functions/': './functions',
      },
    },
    optimizeDeps: {
      include: ['solid-js/h/jsx-runtime'],
    },
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
    clearScreen: false,
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
