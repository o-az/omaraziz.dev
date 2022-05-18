import type { RouteDefinition } from 'solid-app-router'
import { lazy } from 'solid-js'

export const ROUTES: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/home')),
  },
  {
    path: '/blog',
    children: [
      {
        path: '/',
        component: lazy(() => import('@/pages/blog')),
      },
      {
        path: '/:id',
        component: lazy(() => import('@/pages/blog/[id]')),
      },
    ],
  },
  {
    path: '/snippets',
    component: lazy(() => import('@/pages/snippets')),
  },
  {
    path: '/projects',
    component: lazy(() => import('@/pages/projects')),
  },
  // {
  //   path: '/*',
  //   component: lazy(() => import('@/pages/404')),
  // },
]
