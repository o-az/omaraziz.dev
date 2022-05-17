import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from '@/components'
import { ROUTES } from '@/routes'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {ROUTES.map(({ name, path, component }) => (
          <Route key={name} path={path} element={component} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
