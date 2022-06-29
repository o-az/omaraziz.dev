// /* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';

import '@/styles/index.css';
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';

import App from '@/App';

console.log(process.env.NODE_ENV);

const root = document.getElementById('root') as unknown as HTMLElement;

const HTML = () => (
  <Router>
    <App />
  </Router>
);

render(HTML, root);
