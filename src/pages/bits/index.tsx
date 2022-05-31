import * as Solid from 'solid-js'
import { Link } from 'solid-app-router'
import { SearchIcon } from '@/components/icons'
import snippets from '@/data/snippets/snippets.json'

type Snippet = typeof snippets[number]

export default function Bits() {
  return (
    <main class="m-3 mt-8 dark:text-white flex justify-center h-full">
      <div class="max-w-2xl w-full">
        <h1
          class="col-span-4 row-span-1 mb-1 min-w-full text-left font-extrabold tracking-wide text-black dark:text-white ibm-plex-sans-bold"
          style={{
            'font-size': 'clamp(6rem, 80%, 200px)',
          }}
        >
          Bits
        </h1>
        <div class="max-w-xl min-w-full grid sm:grid-cols-3 grid-cols-2 gap-6" id="articles">
          <Solid.For each={snippets} fallback={<p>No articles match your search</p>}>
            {({ title, description, filename, date, tags }, index) => (
              <Link
                id={`${index}`}
                href={`/bits/${filename}`}
                title={title}
                data-description={description}
                data-date={date}
                data-tags={tags}
                class="m-auto border-1 border-gray-600 text-gray-800 hover:border-gray-700 rounded-md hover:bg-gray-900 hover:cursor-pointer p-4.5 flex flex-col space-y-2 dark:text-gray-200 hover:text-light-900"
              >
                <h1 class="text-xl dark:text-light-50 tracking-wide font-semibold">{title}</h1>
                <p class="break-words overflow-ellipsis antialiased">{description}</p>
              </Link>
            )}
          </Solid.For>
        </div>
      </div>
    </main>
  )
}
