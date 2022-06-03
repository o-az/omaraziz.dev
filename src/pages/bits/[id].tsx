import * as Solid from 'solid-js'
import html from 'solid-js/html'
import { RouteDataFuncArgs, useParams } from 'solid-app-router'
import { Snippet } from '@/components'
import { useRouteData, useResolvedPath } from 'solid-app-router'
import type { SnippetWorkerResponse, RouteDataFetchResponse } from '@/types'
import { fetcher, parseStringHTML } from '@/utilities'
import { CLOUDFLARE_WORKERS_URL } from '@/constants'
import { template } from 'solid-js/web'
// import rehypeHighlight from 'rehype-highlight'
// import "@/styles/markdown.css"
// import Prism from 'prismjs'
// import 'prismjs/components/prism-haml'
// import 'prismjs/components/prism-markdown'
// import 'prismjs/components/prism-typescript'

// import 'prismjs/plugins/line-highlight/prism-line-highlight'
// import 'prismjs/plugins/match-braces/prism-match-braces'
// import 'prismjs/plugins/autoloader/prism-autoloader'
// import 'prismjs/plugins/filter-highlight-all/prism-filter-highlight-all'
// import 'prismjs/plugins/treeview/prism-treeview'
// import 'prismjs/themes/prism-okaidia.css'

interface SnippetData {
  code: string
  language: string
  title: string
  description: string
}

const fetchSnippet = async () => {
  const url = CLOUDFLARE_WORKERS_URL.snippets.proxy
  const response = await fetch(url)
  const data = await response.json<SnippetData>()
  return data
}

const code = `const snippet = "cool markdown highlighting!";`
// const highlighted = Prism.highlight(code, (Prism.languages as unknown as any).typescript, 'typescript')
// console.log(highlighted)

export default function Bit() {
  const { id: snippetId } = useParams<{ id: string }>()
  // const [bits] = Solid.createResource(() => snippetId, fetchSnippet)
  // Solid.createEffect(() => {
  //   Prism.highlightAll()
  // })
  return (
    <main class="m-6 p-4 dark:text-white flex max-w-full justify-center">
      {/* {template(`<pre><code>${highlighted}</code></pre>`, 0, false)} */}
      <Solid.Suspense>
        {/* <Snippet code={code} language="ts" lineNumbers={false} /> */}
        <div class="language-js" id="prism">
          <pre class="language-js">
            <code>const code = `const snippet = "cool markdown highlighting!";`</code>
          </pre>
        </div>

        {/* <main>{template(bits()?.code, 0, false)}</main> */}
        {/* <pre>{JSON.stringify(bits())}</pre> */}
      </Solid.Suspense>
    </main>
  )
}
