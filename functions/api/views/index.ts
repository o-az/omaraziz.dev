import { devLogger } from '~functions/utilities'

type Views = Array<{ slug: string; views: string | null }>
type Data = Record<'data', { total: number; views: Views } | null>

type FunctionResponse = Data & { error: string | null }

export const onRequestGet: PagesFunction<{ BLOG_VIEWS: KVNamespace }> = async ({ env, functionPath }) => {
  let response: FunctionResponse
  try {
    const { BLOG_VIEWS } = env
    const kvList = await BLOG_VIEWS.list()
    const promise = kvList.keys.map(async ({ name }) => ({ slug: name, views: await BLOG_VIEWS.get(name) }))
    const allKVsData = await Promise.all(promise)
    response = {
      data: {
        total: allKVsData.reduce((acc, { views }) => acc + Number(views), 0),
        views: allKVsData,
      },
      error: null,
    }
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ` + error
    devLogger([functionPath, errorMessage])
    response = { data: null, error: errorMessage }
    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}
