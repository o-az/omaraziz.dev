import * as Solid from 'solid-js'
import html from 'solid-js/html'
import { useParams } from 'solid-app-router'
import { Snippet } from '@/components'
import { useRouteData } from 'solid-app-router'
import type { SnippetWorkerResponse, RouteDataFetchResponse } from '@/types'
import { fetcher, parseStringHTML } from '@/utilities'
import { CLOUDFLARE_WORKERS_URL } from '@/constants'

type Params = { id: string }

const getSnippetData = async () => {
  try {
    const url = CLOUDFLARE_WORKERS_URL.snippets.proxy
    const { data, error } = await fetcher<SnippetWorkerResponse>(url)
    console.log(data, error)
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error
    console.trace(errorMessage)
    return 'error'
  }
}

export default function Bit() {
  const { id: snippetId } = useParams<Params>()
  const [data, setData] = Solid.createSignal()
  // console.log(getSnippetData())
  const [resource, { mutate, refetch }] = Solid.createResource(() => snippetId, getSnippetData)
  console.log(resource())

  return (
    <main class="m-6 p-4 dark:text-white flex max-w-full justify-center">
      {/* <section>{resource.title || resource || '...'}</section> */}
    </main>
  )
}
// export default function Bit() {
//   const { id: snippetId } = useParams<Params>()
//   // const [fullfiled, setFullfiled] = Solid.createSignal<SnippetWorkerResponse | null>(null)
//   // const routeData = useRouteData<Promise<RouteDataFetchResponse<SnippetWorkerResponse>>>()

//   // const awaitRouteData = async () => {
//   //   const { data, error } = await routeData
//   //   if (error) return
//   //   // console.log(data)
//   //   const { code, ...rest } = data
//   //   const parseCode = parseStringHTML(code)
//   //   setFullfiled(() => ({ code, ...rest }))
//   //   console.log(data, error, fullfiled()?.code)
//   // }

//   // awaitRouteData()
//   return (
//     <main class="m-6 p-4 dark:text-white flex max-w-full justify-center">
//       <section></section>
//     </main>
//   )
// }
