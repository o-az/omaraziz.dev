import * as Solid from 'solid-js'
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
    <div class="flex my-3 m-3 h-full w-full justify-between px-5 pt-1 bg-transparent h-full subpixel-antialiased ibm-plex-sans">
      <nav class="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto bg-opacity-60 px-6 text-xl align-bottom">
        {/* <a href="#skip" class="skip-nav">
          Skip to content
        </a> */}
        <div class="ml-[-0.60rem] space-x-7 flex">
          <Solid.For each={HEADER_ITEMS}>
            {({ name, path }) => (
              <Link
                class="rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 sm:px-3 sm:w-auto text-2xl align-bottom"
                href={path}
              >
                {name}
              </Link>
            )}
          </Solid.For>
        </div>
        <Toggle />
      </nav>
    </div>
  )
}
