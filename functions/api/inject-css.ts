export const onRequestGet: PagesFunction<{
  PING: KVNamespace
}> = async ({ request, env, params, waitUntil, next, data }) => {
  try {
    const element = `
      <script type="module">
        import confetti from 'https://cdn.skypack.dev/canvas-confetti';
        confetti();
      </script>
    `

    return new Response(JSON.stringify({ data: '' }), {
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
