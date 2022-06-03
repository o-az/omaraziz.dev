export const onRequestGet: PagesFunction = async context => {
  try {
    return new Response(JSON.stringify({ ping: 'pong' }), {
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
