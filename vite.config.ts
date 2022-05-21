/// <reference types="vite/client" />
/// <reference types="vitest" />

// Plugins
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

/** MDX config */
// MDX Plugins
import rehypePrettyCode from 'rehype-pretty-code'
const { default: mdx } = await import('@mdx-js/rollup')
import type { Options as MdxOptions } from '@mdx-js/rollup'
// const { default: remarkGfm } = await import('remark-gfm')
// const { default: rehypeSlugs } = await import('rehype-slug')
// const { default: rehypeHighlight } = await import('rehype-highlight')
// const { remarkMdxFrontmatter } = await import('remark-mdx-frontmatter')
// const { default: remarkFrontmatter } = await import('remark-frontmatter')
// const { default: rehypeAutolinkHeadings } = await import('rehype-autolink-headings')

// const theme = await import('./public/assets/mdx-theme/moonlight-ii.json')
const rehypePrettyCodeOptions = {
  theme: await import('./public/assets/mdx-theme/moonlight-ii.json'),
  onVisitLine(node: { children: { type: string; value: string }[] }) {
    if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }]
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push('line--highlighted')
  },
  onVisitHighlightedWord(node: { properties: { className: string[] } }) {
    node.properties.className = ['word']
  },
}

const mdxConfig: MdxOptions = {
  jsxImportSource: 'solid-jsx',
  remarkPlugins: [
    // remarkGfm,
    // rehypeSlugs,
    // rehypeHighlight,
    // remarkFrontmatter,
    // remarkMdxFrontmatter,
    // rehypeAutolinkHeadings,
  ],
  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
}

/** Vite config */
const config = async (): Promise<UserConfig> => {
  return {
    plugins: [solid(), WindiCSS(), tsconfigPaths(), mdx(mdxConfig)],
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
    build: { target: 'esnext', polyfillDynamicImport: false },
    /** vitest */
    test: { globals: true },
  }
}

export default defineConfig(config)
