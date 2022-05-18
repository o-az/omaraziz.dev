import { Blog } from './blog'
import { Home } from './home'
import { Projects } from './projects'
import { Snippets } from './snippets'

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
] as const
