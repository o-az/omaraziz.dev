import type { PickWithOptional, SomeRequired } from './utility-types'

type LinkTagProps = PickWithOptional<
  HTMLLinkElement,
  'href' | 'rel' | 'type',
  'title' | 'crossOrigin' | 'hreflang' | 'media'
>

type NewLinkTagStatus = 'ALREADY_EXISTS' | 'CREATED' | 'ERROR'
type NewLinkTagArgs = Pick<HTMLLinkElement, 'href' | 'rel' | 'type'> & Partial<HTMLLinkElement>

export function newLinkTag(attributes: NewLinkTagArgs): NewLinkTagStatus {
  // these two attributes are required
  const { href, rel, title } = attributes
  if (!href || !rel) {
    console.error('newLinkTag: href and rel are required attributes')
    return 'ERROR'
  }
  // check if tag already exists
  const linkTagExists = document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null
  if (linkTagExists) return 'ALREADY_EXISTS'
  // const styleTagExists = document.querySelector(`style[data-for="EXTERNAL_CSS"]`) as HTMLStyleElement | null

  /**
   * Next 5 lines are optional.
   * For organizational purposes, I like having a <meta name="EXTERNAL_CSS" /> tag in
   * my head that I can add my external CSS under to keep things organized.
   */
  let insertLocation = document.querySelector('style[data-for="EXTERNAL_CSS"]')
  if (!insertLocation) {
    insertLocation = document.createElement('style')
    insertLocation.setAttribute('data-for', 'EXTERNAL_CSS')
    insertLocation.innerHTML = '/** EXTERNAL CSS COMMENT **/'
  }

  const styleFragment = `<style data-for="EXTERNAL_CSS"> @import url('${href}'); </style>`
  const range = document.createRange()
  const fragment = range.createContextualFragment(styleFragment)

  const { head } = document
  // head.appendChild(fragment)
  return 'CREATED'
}

const httpHeaders = [
  'Cache-Control',
  'Content-Language',
  'Content-Type',
  'Content-Security-Policy',
  'Expires',
  'Pragma',
  'Referrer-Policy',
  'Last-Modified',
  'etag',
  'x-cache',
  'x-cache-hits',
]

export async function fetchContentType(url: string) {
  const headers = await fetchHeaders(url)
  const contentType = headers['content-type'] || headers['Content-Type']
  return contentType
}

// fetch HEAD to get MIME type
export async function fetchHeaders(url: string) {
  const response = await fetch(url, { method: 'HEAD' })
  const { headers } = response
  let returnedHeaders = {} as { [key: string]: string }
  headers.forEach((v, k) => (returnedHeaders[k] = v))
  return returnedHeaders
}

export const removeFalsy = <T>(object: T): NonNullable<T> => JSON.parse(JSON.stringify(object))

export const htmlTagExists = (selectors: string) => !!document.querySelector(selectors)

export function insertHeadTag({ url, fileExtension }: { url: string; fileExtension: 'css' | 'js' }) {
  const { innerHTML: headHTML } = document.head
  const tag = fileExtension === 'css' ? 'link' : 'script'
  const attrs = fileExtension === 'css' ? { rel: 'stylesheet', href: url } : { src: url }
  const newHeadHTML = headHTML.replace(new RegExp(`<${tag}(.*?)>`, 'g'), `<${tag} ${attrsToString(attrs)}>`)
  document.head.innerHTML = newHeadHTML
}

function attrsToString(attrs: { [key: string]: string }) {
  return Object.keys(attrs)
    .map(key => `${key}="${attrs[key]}"`)
    .join(' ')
}

export function fontLoader({ family, effect }: { family: string; effect: string }) {
  let link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'

  //link.href = 'http://fonts.googleapis.com/css?family=Oswald&effect=neon';
  document.head.appendChild(link)

  link.href = 'http://fonts.googleapis.com/css?family=' + family + '&effect=' + effect
}

export async function fetcher<TResponse>(...args: Parameters<typeof fetch>): Promise<{
  data: TResponse | null
  error: string | null
}> {
  // const [method, headers, body, ...rest] = args || {}
  try {
    const response = await fetch(...args)
    const data = (await response.json()) as TResponse
    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error in fetcher(): ` + error
    console.trace(errorMessage)
    return { data: null, error: errorMessage }
  }
}

export function parseStringHTML(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export const ArrayToChunks = (array: Array<string>, chunkSize: number): Array<string>[] => {
  const items = new Array(Math.ceil(array.length / chunkSize))
  return items.fill(0).map(() => array.splice(0, chunkSize))
}

export const getTimestamp = () => {
  const [timestamp] = new Date().toISOString().split('T')
  return timestamp
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined
