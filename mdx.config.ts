import { type Options as MdxOptions } from '@mdx-js/rollup'
import remarkGfm, { Root, type Options as RemarkGfmOptions } from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkMath from 'remark-math'
import remarkLint from 'remark-lint'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'
import remarkFrontmatter, { type Options as RemarkFrontmatterOptions } from 'remark-frontmatter'
import remarkToC, { type Options as RemarkToCOptions } from 'remark-toc'
import remarkGemoji from 'remark-gemoji'
import rehypeSlug from 'rehype-slug'
import rehypeMathjax from 'rehype-mathjax'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'

import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeTheme from './public/assets/mdx-theme/moonlight-ii.json'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: { dark: JSON.parse(JSON.stringify(rehypeTheme)), light: 'github-light' },
  tokensMap: { fn: 'entity.name.function' },

  onVisitLine: node => {
    if (node.children.length === 0) return (node.children = [{ type: 'text', value: ' ' }])
  },
  onVisitHighlightedLine: node => node.properties.className.push('highlighted'),
  onVisitHighlightedWord: node => (node.properties.className = ['word']),
}

const remarkGfmOptions: RemarkGfmOptions = {
  singleTilde: true,
  tablePipeAlign: true,
  stringLength: (str: string) => str.length,
}

const remarkToCOptions: RemarkToCOptions = {
  tight: true,
  ordered: false,
  prefix: '',
  skip: undefined,
  parents: undefined,
  maxDepth: 2,
}

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
  properties: { className: ['anchor'] },
}
const remarkFrontmatterOptions: RemarkFrontmatterOptions = ['yaml', 'toml']

export const mdxConfig: MdxOptions = {
  useDynamicImport: true,
  jsxImportSource: 'solid-jsx',
  providerImportSource: 'solid-mdx',
  development: process.env.NODE_ENV === 'development',
  remarkRehypeOptions: {
    allowDangerousHtml: true,
  },
  remarkPlugins: [
    remarkMdx,
    remarkMath,
    remarkLint,
    remarkGemoji,
    [remarkFrontmatter, remarkFrontmatterOptions],
    remarkMdxFrontmatter,
    [remarkToC, remarkToCOptions],
    [remarkGfm, remarkGfmOptions],
    // () => root => console.log(JSON.stringify(root, null, 2)),
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeMathjax,
    rehypeCodeTitles,
    [rehypePrettyCode, rehypePrettyCodeOptions],
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    // () => root => console.log(JSON.stringify(root, null, 2)),
  ],
  outputFormat: 'program',
  recmaPlugins: [],
}
