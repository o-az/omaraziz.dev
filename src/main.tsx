import '@/config/sentry'
import '@/styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
const HTML = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
root.render(HTML)
