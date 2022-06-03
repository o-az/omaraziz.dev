import { MetaProvider } from 'solid-meta'
import { useRoutes } from 'solid-app-router'

import { ROUTES } from '@/routes'
import { META_TAGS } from '@/data'
import { Header, MetaTags, BaseErrorBoundary } from '@/components'

export default function App() {
  const Route = useRoutes(ROUTES)

  return (
    <MetaProvider>
      <MetaTags title="✨" metas={META_TAGS} />
      <Header />
      <BaseErrorBoundary>
        <Route />
      </BaseErrorBoundary>
    </MetaProvider>
  )
}
