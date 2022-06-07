import * as Solid from 'solid-js'
import { useParams, useRouteData } from 'solid-app-router'
import type { Article, MetaAttributes } from '@/types'
import { dateStringToHuman, devLogger } from '@/utilities'
import { fetchBlogViews } from '@/api/views'
import resultImage from '/images/syntax-highlight-gist-cdn.png'
import { Page } from '@/components'
import '@/styles/markdown.css'

function applyTargetAttribute(element: HTMLAnchorElement) {
  const id = element.getAttribute('href')
  if (!id) return
  const currentTarget = element.getAttribute('target')
  if (currentTarget) return
  element.setAttribute('target', `_top`.replace(/^#/, ''))
}

export default function BlogPost() {
  const { id: filename } = useParams<{ id: string }>()
  const Markdown = Solid.lazy(() => import(`../../data/articles/${filename}.mdx`))
  const article = useRouteData<Article>()

  const [blogViews, { mutate, refetch }] = Solid.createResource(() => filename, fetchBlogViews, {
    deferStream: true,
  })

  Solid.onMount(() => {
    // if (import.meta.env.DEV) return
    const element = document.querySelector('main')
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
  Solid.onMount(() => {
    setTimeout(() => {
      const anchors = document.querySelectorAll('a')
      anchors.forEach(applyTargetAttribute)
    }, 1000)
  })

  const metaTags: MetaAttributes[] = [
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
    <Page title={article.title} metaTags={metaTags} to404={true}>
      <main class="flex flex-col mx-auto px-6 justify-center sm:(w-full px-8) max-w-3xl dark:text-gray-200 mb-8 antialiased max-w-full">
        <Solid.Suspense fallback={<span></span>}>
          <h1 class="font-bold text-black text-center tracking-tight text-4xl sm:(text-left) md:(text-6xl) dark:(text-white)">
            {article?.title}
          </h1>
          <div class="flex flex-col my-4 text-sm mb-4 w-full text-gray-600 items-start justify-between subpixel-antialiased md:(items-center flex-row) dark:(text-gray-200) ">
            <p class="text-center ml-2 w-full sm:(text-left)">Omar Aziz / {dateStringToHuman(article.date)}</p>

            <p class="mt-2 text-center w-full sm:(text-right) md:(mt-0)">
              {article.readingTime}{' '}
              {blogViews.error || blogViews()?.error || !blogViews()?.data || !blogViews()?.data?.views
                ? ''
                : ` • ${blogViews()?.data?.views} views`}
            </p>
          </div>
          <ul class="text-center sm:(text-left)">
            {article.tags.map(tag => (
              <li class="rounded-sm font-semibold bg-gray-200 text-sm mr-2 py-1 px-2 text-gray-700 inline-block dark:(text-gray-300 bg-gray-800) hover:(text-white font-bold bg-gray-400 cursor-text)">
                <p class="focus:outline-none hover:(cursor-text)">{tag}</p>
              </li>
            ))}
          </ul>
          <article
            id="article"
            class="flex flex-col h-full m- min-w-full mt-6 mb-16 items-start justify-center prose prose-img:rounded-xl prose-img:(border-b-2 prose-a:(text-blue-300) dark:(prose-invert text-gray-700) truncate max-w-full prose-p:text-white text-white"
          >
            <Markdown />
          </article>
        </Solid.Suspense>
        <div class="giscus"></div>
      </main>
    </Page>
  )
}
