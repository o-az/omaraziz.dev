import * as Solid from 'solid-js'
import { useParams } from 'solid-app-router'
import { ARTICLES_PATH } from '@/constants'
import '@/styles/blog.css'

type Params = { id: string }

export default function BlogPost() {
  const { id: filename } = useParams<Params>()

  const Markdown = Solid.lazy(() => import(`${ARTICLES_PATH}/${filename}.mdx`))

  return (
    <main class="m-6 p-4 dark:text-white flex max-w-full justify-center">
      <section>
        <Markdown />
      </section>
    </main>
  )
}
