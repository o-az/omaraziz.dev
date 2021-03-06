import * as Solid from 'solid-js';
import { Link, useRouteData } from 'solid-app-router';
import type { Article } from '@/types';

const Page = Solid.lazy(() => import('@/components/page'));
const SearchBar = Solid.lazy(() => import('@/components/search-bar'));

function filterArticles({ text, articles }: { text: string; articles: Article[] }) {
  return articles.filter(({ title }) => text.length && title.toLowerCase().includes(text.toLowerCase()));
}

export default function Blog() {
  const articles = useRouteData<Article[]>();
  const [posts, setPosts] = Solid.createSignal(articles);

  const searchFiltering = (event: Event) => {
    const { value: text } = event.currentTarget as HTMLInputElement;
    const filtered = filterArticles({ text, articles: articles });
    setPosts(() => (text.length === 0 ? articles : filtered));
  };

  return (
    <Page title="Blog">
      <main class="flex m-3 mt-25 justify-center dark:text-white">
        <div class="max-w-xl w-full">
          <h1 class="font-extrabold min-w-full text-center text-black mb-7 tracking-wide col-span-4 row-span-1 ibm-plex-sans-bold dark:text-white aspect-w-1 text-7xl">
            Articles
          </h1>
          <SearchBar onInputChange={searchFiltering} placeholder="Search articles" />
          <div class="min-w-full max-w-xl space-y-7" id="articles">
            <Solid.For
              each={posts()}
              fallback={<p class="text-zinc-800 dark:text-light-50">No articles match your search</p>}
            >
              {(article, index) => {
                const { title, description, date, filename, tags } = article;
                return (
                  <Link
                    rel="prefetch"
                    href={`/blog/${filename}`}
                    id={`${index()}`}
                    title={title}
                    data-description={description}
                    data-date={date}
                    data-tags={tags}
                    class="rounded-md flex flex-col m-auto space-y-2 border-1 border-gray-600 p-3 text-gray-800 dark:text-gray-200 hover:cursor-pointer hover:bg-gray-200 hover:border-gray-500 hover:text-gray-900 hoverbg-light-900 hover:border-gray-100 dark:hover:bg-zinc-900"
                    // class="rounded-md flex flex-col m-auto space-y-2 border-1 border-gray-600 p-4.5 text-gray-800 dark:text-gray-200 hover:cursor-pointer hover:bg-zinc-900 hover:border-gray-700 hover:(text-light-900 bg-light-900 border-gray-100) dark:hover:bg-zinc-900"
                  >
                    <h1 class="font-semibold text-xl tracking-wide dark:text-light-50">{title}</h1>
                    <p class="break-words overflow-ellipsis antialiased dark:text-gray-200">{description}</p>
                  </Link>
                );
              }}
            </Solid.For>
          </div>
        </div>
      </main>
    </Page>
  );
}
