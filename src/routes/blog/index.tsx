import * as React from 'react'

import Post from '@/blog/helloworld.mdx'
import { SearchIcon } from '@/components/icons'

export function Blog() {
  return (
    <main className="m-6 mt-20 grid h-screen grid-cols-3 grid-rows-6 gap-y-4 text-white">
      <section className="col-span-full row-span-2 flex h-full flex-col items-center justify-evenly">
        <h1 className="mb-1 w-64 text-left text-9xl font-extrabold tracking-tight text-black dark:text-white md:text-5xl">
          Blog
        </h1>
        {/* <button className="flex h-8 w-72 items-center rounded-md border-white bg-gray-600 px-2 ring-1 ring-gray-500 ring-offset-gray-900 focus:ring-gray-300">
          <input className="focus:ring-2xl h-full w-full rounded-md bg-transparent px-2 py-4 focus:outline-none focus:ring-0 focus:ring-offset-transparent" />
          <SearchIcon />
        </button> */}
        <div className="relative mb-4 w-full md:w-96">
          <input
            type="text"
            aria-label="Search articles"
            placeholder="Search articles"
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <SearchIcon />
        </div>
      </section>
      <section className="row-span-1">
        <Post />
      </section>
    </main>
  )
}
