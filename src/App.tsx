import { useRoutes } from 'solid-app-router'
import type { Component } from 'solid-js'
import { MetaProvider } from 'solid-meta'

import { Header, MetaTags } from '@/components'
import { ROUTES } from '@/routes'
import { META_TAGS } from '@/data'

const App: Component = () => {
  const Route = useRoutes(ROUTES)

  return (
    <MetaProvider>
      <MetaTags title="✨" metas={META_TAGS} />
      <Header />
      <Route />
    </MetaProvider>
  )
}

export default App
