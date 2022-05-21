import type { RouteDefinition } from 'solid-app-router'
import { lazy } from 'solid-js'
import { fetcher } from '@/utilities'
import type { SnippetWorkerResponse, RouteDataFetchResponse } from './types'
import { CLOUDFLARE_WORKERS_URL } from '@/constants'

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
        // data: async () => {
        //   const url = CLOUDFLARE_WORKERS_URL.snippets.proxy
        //   const { data, error } = await fetcher<RouteDataFetchResponse<SnippetWorkerResponse>>(url)
        //   return { data, error }
        // },
      },
    ],
  },
  {
    path: '/projects',
    component: lazy(() => import('@/pages/projects')),
  },
]
