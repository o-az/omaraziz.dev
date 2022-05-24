import '@/styles/markdown.css'
import * as Solid from 'solid-js'
import { useParams } from 'solid-app-router'
import { ARTICLES_PATH } from '@/constants'
import { template } from 'solid-js/web'
import html from 'solid-js/html'

type Params = { id: string }
// import Markdown from '../../data/articles/hello-world.mdx'

export default function BlogPost() {
  const { id: filename } = useParams<Params>()
  const Markdown = Solid.lazy(() => import(`${ARTICLES_PATH}/${filename}.mdx`))

  return (
    <>
      <main class="m-auto p-4 dark:text-white text-gray-900 flex flex-col w-[45rem] max-w-full justify-center">
        <section>
          <Markdown />
        </section>
      </main>
    </>
  )
}
