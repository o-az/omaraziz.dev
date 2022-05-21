import * as Solid from 'solid-js'
import { Link } from 'solid-app-router'
import { SearchIcon } from '@/components/icons'
import postsInfo from '@/articles/_posts.json'

type Article = typeof postsInfo[number]

function filterArticles({ text, articles }: { text: string; articles: Article[] }) {
  return articles.filter(({ title }) => text.length && title.toLowerCase().includes(text.toLowerCase()))
}

const [posts, setPosts] = Solid.createSignal(postsInfo)

const searchFiltering = (event: InputEvent | Event) => {
  const text = (event.currentTarget as HTMLInputElement).value
  const filtered = filterArticles({ text, articles: postsInfo })
  setPosts(() => (text.length === 0 ? postsInfo : filtered))
}

export default function Blog() {
  return (
    <main class="m-6 mt-8 dark:text-white grid place-items-center justify-center">
      <div class="max-w-xl min-w-xl">
        <h1
          class="col-span-4 row-span-1 mb-1 w-64 w-full text-left font-extrabold tracking-tight text-black dark:text-white"
          style={{
            'font-size': 'clamp(6rem, 80%, 200px)',
          }}
        >
          Blog
        </h1>
        <SearchBar onInputChange={searchFiltering} />
        <div class="space-y-7 max-w-xl" id="articles">
          <Solid.For each={posts()} fallback={<p>No articles found</p>}>
            {({ id, title, description, date, filename, tags }, index) => (
              <Link
                href={`/blog/${filename}`}
                id={id}
                title={title}
                c-description={description}
                c-date={date}
                c-tags={tags}
                class="m-auto border-1 border-gray-500 text-gray-800 hover:border-gray-700 rounded-md hover:bg-gray-900 hover:cursor-pointer p-4.5 flex flex-col space-y-2 dark:text-gray-200 hover:text-light-900"
              >
                <h1 class="text-2xl">{title}</h1>
                <p class="break-words overflow-ellipsis">{description}</p>
              </Link>
            )}
          </Solid.For>
        </div>
      </div>
    </main>
  )
}

function SearchBar(props: { onInputChange: (event: InputEvent | Event) => void }) {
  const [{ onInputChange }] = Solid.splitProps(props, ['onInputChange'])
  return (
    <div class="relative mb-6 w-full w-full">
      <input
        onInput={onInputChange}
        id="search"
        type="text"
        aria-label="Search articles"
        placeholder="Search articles"
        class="block w-full rounded-md border border-gray-200 bg-white px-4 py-2
        text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
      />
      <SearchIcon />
    </div>
  )
}
