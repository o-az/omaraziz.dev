const errorHandler: PagesFunction = async ({ request, env, params, waitUntil, next, data }) => {
  // console.log(JSON.stringify({ env }, null, 2))
  try {
    return await next()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Cloudflare Function encountered an error: ` + error
    console.trace(errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', functions: 'true' },
    })
  }
}

class AttributeRewriter {
  attributeName: string
  constructor(attributeName: string) {
    this.attributeName = attributeName
  }

  element(element: Element) {
    // access the h1 element that comes right after <article>
    console.log(element.children)
    // const h1 = element.querySelector('h1')
    // console.log(`AttributeRewriter: ${h1}`)
    // if (!h1) return
    // const newId = h1.textContent?.replace(/\s+/g, '-').toLowerCase()
    // const attribute = element.getAttribute(this.attributeName)
    // if (attribute) {
    //   element.setAttribute(this.attributeName, `${newId}`)
    // }
  }
}

const rewriter = new HTMLRewriter().on('script', new AttributeRewriter('src'))

const responseHandler: PagesFunction = async ({ request, env, params, waitUntil, next, data }) => {
  const response = await next()
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('text/html')) {
    console.log(contentType)
    return rewriter.transform(response)
  }
  return response
}

export const onRequest = [errorHandler, responseHandler]
