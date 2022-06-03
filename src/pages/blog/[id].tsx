import * as Solid from 'solid-js'
import { Navigate, useParams, useRouteData } from 'solid-app-router'
import { Meta, Title } from 'solid-meta'
import 'typed-query-selector'
import type { Article } from '@/types'
import { dateStringToHuman } from '@/utilities'
import '@/styles/markdown.css'
import { fetchBlogViews } from '@/api/views'

setTimeout(() => {
  const head = document.querySelector('html>head') as unknown as HTMLHeadElement
  const misplacedHead = document.querySelector('article>head') as unknown as HTMLHeadElement
  if (!head || !misplacedHead) return
  const { innerHTML } = misplacedHead
  const range = document.createRange()
  const fragment = range.createContextualFragment(`${innerHTML}`)
  head.appendChild(fragment)
  misplacedHead.remove()
}, 100)

export default function BlogPost() {
  const { id: filename } = useParams<{ id: string }>()
  const Markdown = Solid.lazy(() => import(`../../data/articles/${filename}.mdx`))
  const article = useRouteData<Article>()

  const [blogViews, { mutate, refetch }] = Solid.createResource(() => filename, fetchBlogViews)

  Solid.onMount(() => {
    const element = document.querySelector('main') as unknown as HTMLElement
    const range = document.createRange()
    const fragment = range.createContextualFragment(
      `<script
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
    ></script>`
    )
    element?.appendChild(fragment)
  })

  const metaTags = [
    {
      name: 'description',
      content: article.description,
    },
    {
      name: 'keywords',
      content: article.tags.join(', '),
    },
    {
      name: 'og:title',
      content: article.title,
    },
    {
      name: 'og:description',
      content: article.description,
    },
    {
      name: 'twitter:title',
      content: article.title,
    },
    {
      name: 'twitter:description',
      content: article.description,
    },
  ]

  return (
    <Solid.ErrorBoundary fallback={<Navigate href="/404" />}>
      <Title>{article.title}</Title>
      {/* {metaTags.map(({ name, content }) => (
        <Meta name={name} content={content} />
      ))} */}
      <main class="flex flex-col mx-auto px-4 justify-center sm:(w-full max-w-3xl px-8) dark:text-white mb-8">
        <Solid.Suspense fallback={<span></span>}>
          <h1 class="font-bold text-black text-center tracking-tight text-4xl sm:(text-left) md:(text-6xl) dark:(text-white)">
            {article?.title}
          </h1>
          <div class="flex flex-col my-4 text-sm mb-4 w-full text-gray-600 items-start justify-between subpixel-antialiased md:(items-center flex-row) dark:(text-gray-400) ">
            <p class="text-center ml-2 w-full sm:(text-left)">Omar Aziz / {dateStringToHuman(article.date)}</p>

            <p class="mt-2 text-center w-full sm:(text-right) md:(mt-0)">
              {article.readingTime}
              {blogViews.error || !blogViews()?.data.views ? null : <span> • {blogViews()?.data.views} views</span>}
            </p>
          </div>
          <ul>
            {article.tags.map(tag => (
              <li class="rounded-sm font-semibold bg-gray-200 text-sm mr-2 py-1 px-2 text-gray-700 inline-block dark:(text-gray-400 bg-gray-800) hover:(text-white font-bold bg-gray-400 cursor-pointer)">
                <a class="focus:outline-none" aria-label="" href="*">
                  {tag}
                </a>
              </li>
            ))}
          </ul>
          <article
            id="article"
            class="flex flex-col h-full m- min-w-full mt-6 mb-16 items-start justify-center prose prose-img:rounded-xl prose-img:(border-b-2 prose-a:(text-blue-700) dark:prose-invert"
          >
            <Markdown />
          </article>
        </Solid.Suspense>
        <div class="giscus"></div>
      </main>
    </Solid.ErrorBoundary>
  )
}
