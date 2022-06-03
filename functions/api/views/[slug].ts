import { devLogger } from '../../utilities'

export const onRequestGet: PagesFunction<
  {
    BLOG_VIEWS: KVNamespace
  },
  'slug'
> = async ({ request, params, env, data, waitUntil, functionPath }) => {
  const { slug } = params as { slug: string }
  const { BLOG_VIEWS } = env
  try {
    const current = await BLOG_VIEWS.get(slug)
    const updated = `${Number(current) + 1}`
    await BLOG_VIEWS.put(slug, updated)
    const response = { data: { slug, views: updated }, error: null }

    devLogger(response)

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ` + error
    console.trace(errorMessage)
    return new Response(JSON.stringify({ data: null, error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}
