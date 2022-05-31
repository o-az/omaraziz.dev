import * as Solid from 'solid-js'
import { useParams, useRouteData } from 'solid-app-router'
import type { Article } from '@/types'
import { Meta, Title } from 'solid-meta'
import 'typed-query-selector'
import '@/styles/markdown.css'

export default function BlogPost() {
  const { id: filename } = useParams<{ id: string }>()
  const Markdown = Solid.lazy(() => import(`../../data/articles/${filename}.mdx`))
  const article = useRouteData<Article>()

  return (
    <Solid.ErrorBoundary fallback={<span>...</span>}>
      <Title>{article.title}</Title>
      <Meta name="description" content={article.description} />
      <Meta name="keywords" content={article.tags.join(', ')} />
      <Meta name="og:title" content={article.title} />
      <Meta name="og:description" content={article.description} />
      <Meta name="twitter:title" content={article.title} />
      <Meta name="twitter:description" content={article.description} />
      <main class="m-auto p-4 dark:text-white text-gray-900 flex flex-col w-[45rem] max-w-full justify-center">
        <Solid.Suspense fallback={<span></span>}>
          <article>
            <Markdown />
          </article>
        </Solid.Suspense>
        <script
          src="https://giscus.app/client.js"
          data-repo="o-az/omaraziz.dev"
          data-repo-id="R_kgDOHUnWOw"
          data-category="General"
          data-category-id="DIC_kwDOHUnWO84CPZZM"
          data-mapping="pathname"
          data-reactions-enabled="1"
          data-emit-metadata="1"
          data-input-position="top"
          data-theme="preferred_color_scheme"
          data-lang="en"
          data-loading="lazy"
          crossorigin="anonymous"
          async
        ></script>
      </main>
    </Solid.ErrorBoundary>
  )
}
