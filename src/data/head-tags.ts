import type { JSX } from 'solid-js'

export const META_TAGS: Array<Pick<JSX.MetaHTMLAttributes<HTMLMetaElement>, 'name' | 'content'>> = [
  {
    name: 'author',
    content: 'Omar',
  },
  {
    name: 'description',
    content: 'Software Engineer, OSS contributor',
  },
  {
    name: 'keywords',
    content: 'software, engineer, open source, contributor',
  },
  {
    name: 'og:site_name',
    content: 'omaraziz.dev',
  },
  {
    name: 'og:url',
    content: 'https://omaraziz.dev',
  },
  {
    name: 'og:type',
    content: 'website',
  },
  {
    name: 'og:locale',
    content: 'en_US',
  },
  {
    name: 'og:title',
    content: 'omaraziz.dev',
  },
  {
    name: 'og:description',
    content: 'Software Engineer, OSS contributor',
  },
  {
    name: 'og:image',
    content: '',
  },
  {
    name: 'og:site',
    content: '@undeterrable',
  },
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:title',
    content: 'Omar Aziz – Software engineer, OSS contributor',
  },
  {
    name: 'twitter:description',
    content: 'gm',
  },
  {
    name: 'twitter:image',
    content: '',
  },
]
