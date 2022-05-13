import * as React from 'react'

const HEADER_ITEMS = [
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
]

export function Header() {
  return (
    <header>
      <ul className="flex gap-8">
        {HEADER_ITEMS.map(({ name, path }) => (
          <li key={name}>
            <a href={path}>{name}</a>
          </li>
        ))}
        {/* <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="./blog">Blog</a>
        </li>
        <li>
          <a href="./snippets">Snippets</a>
        </li> */}
      </ul>
    </header>
  )
}
