export async function fetchTotalBlogViews() {
  const response = await fetch(`/api/views`)
  const data = await response.json<{ error: string | null; data: Array<{ slug: string; views: string }> }>()
  return data
}

export async function fetchBlogViews(slug: string) {
  const response = await fetch(`/api/views/${slug}`)
  const data = await response.json<{ error: string | null; data: { slug: string; views: string } }>()
  return data
}
