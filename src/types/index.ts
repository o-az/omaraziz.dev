export type MetaAttributes = Partial<Pick<HTMLMetaElement, 'content' | 'httpEquiv' | 'media' | 'scheme' | 'name'>>
// as unknown as some html element
export type HTMLElementType<T> = T extends HTMLElement ? T : never

export interface SnippetWorkerResponse {
  code: string
  language: string
  title: string
  description: string
}

export interface RouteDataFetchResponse<T> {
  data: T
  error: string | null
}

export interface Article {
  filename: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}
