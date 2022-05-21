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
    path: '/bits',
    children: [
      {
        path: '/',
        component: lazy(() => import('@/pages/bits')),
      },
      {
        path: '/:id',
        component: lazy(() => import('@/pages/bits/[id]')),
      },
    ],
  },
  {
    path: '/projects',
    component: lazy(() => import('@/pages/projects')),
  },
]
