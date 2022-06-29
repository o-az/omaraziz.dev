import { type Options as MdxOptions } from '@mdx-js/rollup';
import remarkGfm, { type Options as RemarkGfmOptions } from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkMath from 'remark-math';
import remarkLint from 'remark-lint';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import remarkFrontmatter, { type Options as RemarkFrontmatterOptions } from 'remark-frontmatter';
import remarkToC, { type Options as RemarkToCOptions } from 'remark-toc';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism';

const remarkGfmOptions: RemarkGfmOptions = {
  singleTilde: true,
  tablePipeAlign: true,
  stringLength: (str: string) => str.length,
};

const remarkToCOptions: RemarkToCOptions = {
  tight: true,
  ordered: false,
  prefix: '',
  skip: undefined,
  parents: undefined,
  maxDepth: 2,
};

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
  properties: { className: ['anchor'] },
};
const remarkFrontmatterOptions: RemarkFrontmatterOptions = ['yaml', 'toml'];

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
    remarkMdxFrontmatter,
    [remarkFrontmatter, remarkFrontmatterOptions],
    [remarkToC, remarkToCOptions],
    [remarkGfm, remarkGfmOptions],
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeMathjax,
    rehypeCodeTitles,
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    rehypePrism
  ],
  outputFormat: 'program',
  recmaPlugins: [],
};
