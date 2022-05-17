import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/routes'
import { Header } from '@/components'

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
