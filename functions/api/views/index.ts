export const onRequestGet: PagesFunction<{ BLOG_VIEWS: KVNamespace }> = async ({ env }) => {
  try {
    const { BLOG_VIEWS } = env
    const kvList = await BLOG_VIEWS.list()
    const promise = kvList.keys.map(async ({ name }) => ({ slug: name, views: await BLOG_VIEWS.get(name) }))
    const data = await Promise.all(promise)
    const total = data.reduce((acc, { views }) => acc + Number(views), 0)
    return new Response(
      JSON.stringify({
        data: {
          total,
          views: data,
        },
        error: null,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ` + error
    console.trace(errorMessage)
    return new Response(JSON.stringify({ data: null, error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}
