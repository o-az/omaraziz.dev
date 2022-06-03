import type { Options as MdxOptions } from '@mdx-js/rollup'
const { default: remarkGfm } = await import('remark-gfm')
import type { Options as RemarkGfmOptions } from 'remark-gfm'
const { default: remarkMdx } = await import('remark-mdx')
const { default: remarkMath } = await import('remark-math')
const { default: remarkDirective } = await import('remark-directive')
const { default: remarkLint } = await import('remark-lint')
const { remarkMdxFrontmatter } = await import('remark-mdx-frontmatter')
const { default: remarkFrontmatter } = await import('remark-frontmatter')
const { default: remarkToC } = await import('remark-toc')
import { Options as RemarkToCOptions } from 'remark-toc'
const { default: remarkGemoji } = await import('remark-gemoji')

const { default: rehypeMeta } = await import('rehype-meta')
import type { Options as RehypeMetaOptions } from 'rehype-meta'
const { default: rehypeCodeTitles } = await import('rehype-code-titles')
const { default: rehypeInferTitleMeta } = await import('rehype-infer-title-meta')
const { default: rehypeInferDescriptionMeta } = await import('rehype-infer-description-meta')
import { Options as RehypeInferDescriptionMetaOptions } from 'rehype-infer-description-meta'
const { default: rehypeInferReadingTimeMeta } = await import('rehype-infer-reading-time-meta')
const { default: rehypeSlugs } = await import('rehype-slug')
const { default: rehypeMathjax } = await import('rehype-mathjax')
const { default: rehypePrettyCode } = await import('rehype-pretty-code')
const { default: rehypeAutolinkHeadings } = await import('rehype-autolink-headings')
import { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
const { default: rehypeTheme } = await import('./public/assets/mdx-theme/moonlight-ii.json')

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: { dark: JSON.parse(JSON.stringify(rehypeTheme)), light: 'github-light' },
  tokensMap: { fn: 'entity.name.function' },
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

const remarkToCOptions: RemarkToCOptions = { tight: true, maxDepth: 2, ordered: false }

const rehypeMetaOptions: RehypeMetaOptions = {
  og: true,
  twitter: true,
  copyright: true,
  type: 'article',
  author: 'Omar Aziz',
  siteAuthor: 'Omar Aziz',
  authorTwitter: '@undeterrable',
  siteTwitter: 'undeterrable',
}

const rehypeInferDescriptionMetaOptions: RehypeInferDescriptionMetaOptions = {
  selector: '.description',
  // comment: '<!-- description -->',
}

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = { properties: { className: ['anchor'] } }

export const mdxConfig: MdxOptions = {
  useDynamicImport: true,
  jsxImportSource: 'solid-jsx',
  providerImportSource: 'solid-mdx',
  development: process.env.NODE_ENV === 'development',
  remarkPlugins: [
    remarkMdx,
    remarkMath,
    remarkLint,
    remarkGemoji,
    remarkDirective,
    remarkMdxFrontmatter,
    [remarkFrontmatter, 'yaml'],
    [remarkToC, remarkToCOptions],
    [remarkGfm, remarkGfmOptions],
  ],
  rehypePlugins: [
    rehypeSlugs,
    rehypeMathjax,
    rehypeCodeTitles,
    rehypeInferTitleMeta,
    rehypeInferReadingTimeMeta,
    [rehypeMeta, rehypeMetaOptions],
    [rehypeInferDescriptionMeta, rehypeInferDescriptionMetaOptions],
    [rehypePrettyCode, rehypePrettyCodeOptions],
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  ],
}
