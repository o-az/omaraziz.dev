import * as Solid from 'solid-js'
import { MetaProvider } from 'solid-meta'
import { useRoutes, Navigate } from 'solid-app-router'
import { ROUTES } from '@/routes'
import { META_TAGS } from '@/data'
import { Header, MetaTags } from '@/components'

export default function App() {
  const Route = useRoutes(ROUTES)

  return (
    <Solid.ErrorBoundary fallback={<Navigate href="/404" />}>
      <MetaProvider>
        {/* <MetaTags title="✨" metas={META_TAGS} /> */}
        <Header />
        <Route />
      </MetaProvider>
    </Solid.ErrorBoundary>
  )
}
