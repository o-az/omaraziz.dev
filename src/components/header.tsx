import * as React from 'react'
import { Link } from 'react-router-dom'
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
  {
    name: 'Snippets',
    path: '/snippets',
  },
  {
    name: 'Projects',
    path: '/projects',
  },
]

export function Header() {
  // TODO: don't forget to remove this
  if (environment.PROD) return null
  return (
    <header>
      <ul className="flex gap-4 text-xl">
        {HEADER_ITEMS.map(({ name, path }) => (
          <Link to={path} key={path}>
            <li
              key={name}
              className="rounded-lg p-1 font-normal text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block"
            >
              {name}
            </li>
          </Link>
        ))}
      </ul>
    </header>
  )
}
