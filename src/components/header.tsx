import { Link } from 'solid-app-router'

import { Toggle } from '@/components'
import { environment } from '@/env'

interface HeaderItem {
  name: string
  path: string
}

const HEADER_ITEMS: ReadonlyArray<HeaderItem> = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  // {
  //   name: 'Bits',
  //   path: '/bits',
  // },
  // {
  //   name: 'Projects',
  //   path: '/projects',
  // },
] as const

export function Header() {
  // TODO: don't forget to remove this
  // if (environment.PROD) return null
  return (
    <header class="mx-4 mt-4 flex flex-row justify-between px-4 pb-10 sm:pb-16">
      <nav class="mt-1.5 relative w-full max-w-md space-x-3 border-gray-200 bg-opacity-60 text-gray-900 dark:border-gray-700 dark:text-gray-100">
        {HEADER_ITEMS.map(({ name, path }) => (
          <Link
            href={path}
            class="rounded-lg font-normal text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-3 sm:py-1 sm:inline-block md:w-auto md:text-lg hover:dark:text-gray-50"
          >
            {name}
          </Link>
        ))}
      </nav>
      <Toggle />
    </header>
  )
}
