import * as Solid from 'solid-js'
import clsx from 'clsx'
import { Link } from 'solid-app-router'
import { SearchIcon } from '@/components/icons'
import postsInfo from '@/data/articles/articles.json'

type Article = typeof postsInfo[number]

function filterArticles({ text, articles }: { text: string; articles: Article[] }) {
  return articles.filter(({ title }) => text.length && title.toLowerCase().includes(text.toLowerCase()))
}

const [posts, setPosts] = Solid.createSignal(postsInfo)

const searchFiltering = (event: Event) => {
  const text = (event.currentTarget as HTMLInputElement).value
  const filtered = filterArticles({ text, articles: postsInfo })
  setPosts(() => (text.length === 0 ? postsInfo : filtered))
}

export default function Blog() {
  return (
    <Solid.ErrorBoundary fallback={<></>}>
      <main class="m-3 mt-8 dark:text-white flex justify-center">
        <div class="max-w-xl w-full">
          <h1
            class="col-span-4 row-span-1 mb-1 min-w-full text-left font-extrabold tracking-wide text-black dark:text-white ibm-plex-sans-bold"
            style={{
              'font-size': 'clamp(6rem, 80%, 200px)',
            }}
          >
            Blog
          </h1>
          <SearchBar onInputChange={searchFiltering} />
          <div class="space-y-7 max-w-xl min-w-full" id="articles">
            <Solid.For
              each={posts()}
              fallback={<p class="text-zinc-800 dark:text-light-50">No articles match your search</p>}
            >
              {({ title, description, date, filename, tags }, index) => (
                <Link
                  href={`/blog/${filename}`}
                  id={`${index}`}
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
    </Solid.ErrorBoundary>
  )
}

function SearchBar(props: { onInputChange: (event: InputEvent | Event) => void }) {
  const [{ onInputChange }] = Solid.splitProps(props, ['onInputChange'])
  return (
    <div class="relative mb-6 w-full w-full">
      <input
        onInput={onInputChange}
        id="search"
        // type="text"
        aria-label="Search articles"
        placeholder="Search articles"
        class={clsx(
          'dark:bg-gray-800 dark:bg-opacity-40 dark:text-gray-100 dark:placeholder-zinc-400 dark:border-rose-50 dark:border-opacity-20',
          'ring-0 outline-0 focus:outline-none block w-full rounded-md border border-solid border-pink-200 bg-white px-4 py-2 text-gray-800 ring-transparent focus:ring-transparent focus:ring-offset-transparent outline-transparent ring-1 ring-opacity-30 focus:ring-zink-500'
        )}
      />
      <SearchIcon />
    </div>
  )
}
