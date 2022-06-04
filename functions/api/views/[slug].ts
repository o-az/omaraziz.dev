import { devLogger } from '~functions/utilities'

type BlogViewsFunction = PagesFunction<{ BLOG_VIEWS: KVNamespace }, 'slug'>

type Data = Record<'data', { slug: string; views: number } | null>
type FunctionResponse = Data & { error: string | null }

const onRequest: BlogViewsFunction = async ({ params, env, functionPath }) => {
  let response: FunctionResponse
  try {
    const { slug } = params as { slug: string }
    const { BLOG_VIEWS } = env
    const current = await BLOG_VIEWS.get(slug)
    const updated = Number(current) + 1
    await BLOG_VIEWS.put(slug, String(updated))
    response = { data: { slug, views: updated }, error: null }

    devLogger([functionPath, response])

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'X-Hello': 'Hello from Cloudflare Fn' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ${error}`
    devLogger([functionPath, errorMessage])
    response = { data: null, error: errorMessage }
    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}

export const onRequestPut = onRequest
export const onRequestGet = onRequest
