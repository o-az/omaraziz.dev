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
