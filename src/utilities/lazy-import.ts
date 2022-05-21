import { lazy } from 'solid-js'

export const lazyImport = async (path: string) => {
  return await lazy(async () => {
    const { module } = await import(path)
    console.log(`lazy-import: ${path}`)
    return { default: module }
  })
}
