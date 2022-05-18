import { useRoutes } from 'solid-app-router'
import type { Component } from 'solid-js'

import { Header } from '@/components'
import { ROUTES } from '@/routes'

const App: Component = () => {
  const Route = useRoutes(ROUTES)

  return (
    <main>
      <Header />
      <Route />
    </main>
  )
}

export default App
