import { devLogger } from '@/utilities'
import * as Solid from 'solid-js'
import { Title, Meta } from 'solid-meta'
import { Navigate } from 'solid-app-router'
import type { MetaAttributes } from '@/types'
export function Page(props: {
  title: string
  to404?: boolean
  metaTags?: Array<MetaAttributes>
  children: Solid.JSXElement
}) {
  const [{ title, metaTags, children, to404 }] = Solid.splitProps(props, ['title', 'metaTags', 'children', 'to404'])
  return (
    <Solid.ErrorBoundary
      fallback={error => {
        devLogger([`${title} PAGE`, error])
        return to404 ? <Navigate href="/404" /> : <></>
      }}
    >
      {metaTags && metaTags.map(tag => <Meta {...tag} />)}
      <Title>{title}</Title>
      {children}
    </Solid.ErrorBoundary>
  )
}
