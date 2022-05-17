import { Home } from './home'
import { Blog } from './blog'
import { Snippets } from './snippets'
import { Projects } from './projects'

interface Route {
  name: string
  path: string
  component: JSX.Element
}

export const ROUTES: ReadonlyArray<Route> = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
  },
  {
    name: 'Blog',
    path: '/blog',
    component: <Blog />,
  },
  {
    name: 'Snippets',
    path: '/snippets',
    component: <Snippets />,
  },
  {
    name: 'Projects',
    path: '/projects',
    component: <Projects />,
  },
]
