import type { RouteDefinition } from 'solid-app-router'
import * as Solid from 'solid-js'
import articles from '@/data/articles/articles.json'
import { fetchBlogViews } from './api/views'

export const ROUTES: RouteDefinition[] = [
  { path: '/', component: Solid.lazy(() => import('@/pages/home')) },
  {
    path: '/blog',
    children: [
      {
        path: '/',
        component: Solid.lazy(() => import('@/pages/blog')),
      },
      {
        path: '/:id',
        component: Solid.lazy(() => import('@/pages/blog/[id]')),
        data: ({ params }) => articles.find(({ filename }) => filename === params['id']),
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
  { path: '**', component: Solid.lazy(() => import('@/pages/404')) },
]
