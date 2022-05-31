import '@/styles/index.css'
import 'virtual:windi.css'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
// /* @refresh reload */
import 'windi.css'

import { Router } from 'solid-app-router'
import { render } from 'solid-js/web'

import App from '@/App'

console.log(process.env.NODE_ENV)
const root = document.getElementById('root') as HTMLElement
const HTML = () => (
  <Router>
    <App />
  </Router>
)

render(HTML, root)
