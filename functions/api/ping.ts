export const onRequestGet: PagesFunction<{
  PING: KVNamespace
}> = async ({ request, env, params, waitUntil, next, data }) => {
  try {
    // console.log({ request, env, params, waitUntil, next, data })
    return new Response(JSON.stringify({ data: 'Hello world!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ` + error
    console.trace(errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}
