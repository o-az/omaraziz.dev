export const onRequestGet: PagesFunction<unknown, 'slug'> = ({ params }) => {
  const { slug } = params
  const html = new HTMLRewriter()
  return new Response(`<h1>A blog with a slug: ${slug}</h1>`, {
    headers: { 'content-type': 'text/html' },
  })
}
