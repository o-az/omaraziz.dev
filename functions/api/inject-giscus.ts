const script = `
  <script src="https://giscus.app/client.js"
    data-repo="o-az/github-discussions"
    data-repo-id="R_kgDOHaKtLg"
    data-category="General"
    data-category-id="DIC_kwDOHaKtLs4CPVhW"
    data-mapping="pathname"
    data-reactions-enabled="1"
    data-emit-metadata="1"
    data-input-position="top"
    data-theme="preferred_color_scheme"
    data-lang="en"
    data-loading="lazy"
    crossorigin="anonymous"
    async
  ></script>
`

export const onRequest: PagesFunction = async ({ request, env, params, waitUntil, next, data }) => {
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
