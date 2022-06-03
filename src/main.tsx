// /* @refresh reload */
import { Router } from 'solid-app-router'
import { render } from 'solid-js/web'

import '@/styles/index.css'
import 'virtual:windi.css'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
import 'windi.css'

import App from '@/App'

console.log(process.env.NODE_ENV)

const root = document.getElementById('root') as unknown as HTMLElement
const HTML = () => (
  <Router>
    <App />
  </Router>
)

render(HTML, root)
