import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/config/sentry'
import '@/styles/index.css'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
const HTML = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
root.render(HTML)
