import * as Solid from 'solid-js'
import { Meta, Title, Link } from 'solid-meta'

export type HeadTags = {
  title: string
  metas: Array<Solid.JSX.MetaHTMLAttributes<HTMLMetaElement>>
  links?: Array<Solid.JSX.LinkHTMLAttributes<HTMLLinkElement>>
}

export function MetaTags(props: HeadTags) {
  const [{ title, metas, links }] = Solid.splitProps(props, ['title', 'metas', 'links'])
  return (
    <>
      <Title>{title}</Title>
      {metas.map(({ ...metaAttributes }) => (
        <Meta {...metaAttributes} />
      ))}
      {links?.map(({ ...linkAttributes }) => (
        <Link {...linkAttributes} />
      ))}
    </>
  )
}

export function addMetaTagToHead(name: string, content: string) {
  const head = document.head
  const meta = document.createElement('meta')
  meta.setAttribute('name', name)
  meta.setAttribute('content', content)
  head.appendChild(meta)
}
