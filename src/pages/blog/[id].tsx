import * as Solid from 'solid-js';
import { useParams, useRouteData } from 'solid-app-router';
import type { Article, MetaAttributes } from '@/types';
import { dateStringToHuman, devLogger, addAnchorsTarget, loadExternalScript } from '@/lib/utilities';
import { fetchBlogViews } from '@/api/views';
import('@/styles/markdown.css');
const Page = Solid.lazy(() => import('@/components/page'));

const giscusScript = `
<script
  src="https://giscus.app/client.js"
  data-repo="o-az/omaraziz.dev"
  data-repo-id="R_kgDOHUnWOw"
  data-category="General"
  data-category-id="DIC_kwDOHUnWO84CPZZM"
  data-mapping="title"
  data-reactions-enabled="1"
  data-input-position="top"
  data-theme="dark"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script>`;

export default function BlogPost() {
  const { id: filename } = useParams<{ id: string }>();
  const Markdown = Solid.lazy(() => import(`../../lib/data/articles/${filename}.mdx`));
  const { title, description, date, readingTime, tags } = useRouteData<Article>();

  const [blogViews] = Solid.createResource(() => filename, fetchBlogViews, {
    deferStream: true,
  });

  Solid.onMount(() => {
    loadExternalScript({ script: giscusScript, devEnabled: true, parentElement: 'main' });
    addAnchorsTarget();
  });

  const metaTags: MetaAttributes[] = [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: tags.join(', '),
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
  ];

  return (
    <Page title={title} metaTags={metaTags} to404={true}>
      <main class="flex flex-col mx-auto px-6 justify-center sm:w-full sm:px-8 max-w-6xl dark:text-gray-200 mb-8 antialiased w-full overflow-hidden sm:p-6">
        <Solid.Suspense fallback={<span></span>}>
          <h1
            class="w-full pb-2 sm:pb-5 -mb-2 text-5xl sm:text-left text-center font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            data-article-title
          >
            {title}
          </h1>
          <div class="flex flex-col my-4 text-sm mb-4 w-full text-gray-600 items-start justify-between subpixel-antialiased md:items-center md:flex-row dark:text-gray-200">
            <p class="text-center ml-2 w-full sm:text-left">Omar Aziz / {dateStringToHuman(date)}</p>

            <p class="mt-2 text-center w-full sm:text-right md:mt-0">
              {readingTime}{' '}
              {blogViews.error || blogViews()?.error || !blogViews()?.data || !blogViews()?.data?.views
                ? ''
                : ` ??? ${blogViews()?.data?.views} views`}
            </p>
          </div>
          <ul class="text-center sm:text-left">
            {tags.map(tag => (
              <li class="rounded-sm font-semibold bg-gray-200 text-sm mr-2 sm:py-1 px-1 sm:px-2 text-gray-700 inline-block dark:text-gray-300 dark:bg-gray-800 hover:text-white hover:font-bold hover:bg-gray-400 hover:cursor-text">
                <p class="focus:outline-none hover:cursor-text">{tag}</p>
              </li>
            ))}
          </ul>
          <article
            id="article"
            class="flex flex-col h-full min-w-full sm:mt-4 mb-16 items-start justify-center prose prose-img:rounded-xl prose-img:border-b-2 prose-a:text-blue-300 dark:prose-invert dark:text-gray-700 truncate max-w-full prose-p:text-white text-white leading-7"
          >
            <Markdown />
          </article>
        </Solid.Suspense>
        <div class="giscus"></div>
      </main>
    </Page>
  );
}
