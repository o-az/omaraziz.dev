import * as Solid from 'solid-js'
import { Link } from 'solid-app-router'
import { SearchIcon } from '@/components/icons'
import snippets from './snippets.json'

type Snippet = typeof snippets[number]

export default function Bits() {
  return (
    <main class="m-6 mt-8 dark:text-white grid place-items-center justify-center">
      <div class="max-w-2xl min-w-xl">
        <h1
          class="col-span-4 row-span-1 mb-6 w-full w-full text-left font-extrabold tracking-tight text-black dark:text-white"
          style={{
            'font-size': 'clamp(2.5rem, 0.75rem + 1.5vw, 2rem)',
          }}
        >
          Bits – Code Snippets
        </h1>
        <div class="space-y-7 max-w-xl" id="articles">
          {snippets.map(({ title, code, language, description }, index) => (
            <Link
              onLoadedData={() => console.log('loaded onLoadedData')}
              href={`/bits/${title}`}
              id={`${index}`}
              title={title}
              c-description={description}
              class="m-auto border-1 border-gray-500 text-gray-800 hover:border-gray-700 rounded-md hover:bg-gray-900 hover:cursor-pointer p-4.5 flex flex-col space-y-2 dark:text-gray-200 hover:text-light-900"
            >
              <h1 class="text-2xl">{title}</h1>
              <p class="break-words overflow-ellipsis">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
