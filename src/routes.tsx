import type { RouteDefinition } from 'solid-app-router'
import * as Solid from 'solid-js'
import articles from '@/data/articles/articles.json'

export const ROUTES: RouteDefinition[] = [
  { path: '/', component: Solid.lazy(() => import('@/pages/home')) },
  {
    path: '/blog',
    data: _ => articles,
    children: [
      {
        path: '/',
        component: Solid.lazy(() => import('@/pages/blog')),
      },
      {
        path: '/:id',
        component: Solid.lazy(() => import('@/pages/blog/[id]')),
        data: args => articles.find(({ filename }) => filename === args.params['id']),
      },
    ],
  },
  {
    path: '/bits',
    children: [
      {
        path: '/',
        component: Solid.lazy(() => import('@/pages/bits')),
      },
      {
        path: '/:id',
        component: Solid.lazy(() => import('@/pages/bits/[id]')),
      },
    ],
  },
  { path: '/projects', component: Solid.lazy(() => import('@/pages/projects')) },
  { path: '*', component: Solid.lazy(() => import('@/pages/404')) },
]
