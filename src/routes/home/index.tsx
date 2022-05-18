import * as React from 'react'

interface LinkItem {
  name: string
  path: string
}

export const LINKS: ReadonlyArray<LinkItem> = [
  {
    name: 'GitHub',
    path: 'https://github.com/o-az',
  },
  {
    name: 'Twitter',
    path: 'https://twitter.com/undeterrable',
  },
  {
    name: 'Email',
    path: 'mailto:hello@omaraziz.dev',
  },
] as const

export function Home() {
  return (
    <main className="grid h-full grid-flow-col items-center  text-center text-white">
      <section className="grid items-center">
        <p
          className="mb-1 text-3xl font-bold tracking-tight text-black selection:bg-red-400 dark:text-white md:text-5xl"
          style={{
            fontSize: 'clamp(4.2rem, -6.0179rem + 28.8571vw, 15.625rem)',
          }}
        >
          Omar Aziz
        </p>
        <ul className="flex justify-center space-x-8 text-xl md:text-4xl">
          {LINKS.map(({ name, path }, index) => (
            <li
              className="rounded-lg p-1 font-normal text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block"
              key={index}
            >
              <a href={path} target="_blank" rel="noreferrer">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
