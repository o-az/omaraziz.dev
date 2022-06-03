import { useRoutes } from 'solid-app-router'
import { MetaProvider } from 'solid-meta'

import { Header, MetaTags } from '@/components'
import { ROUTES } from '@/routes'
import { META_TAGS } from '@/data'

export default function App() {
  const Route = useRoutes(ROUTES)

  return (
    <MetaProvider>
      <MetaTags title="✨" metas={META_TAGS} />
      <Header />
      <Route />
    </MetaProvider>
  )
}
