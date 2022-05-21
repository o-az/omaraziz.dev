export async function fetcher<TResponse>(
  url: string,
  { config }: { config?: RequestInit } = {}
): Promise<{
  data: TResponse | null
  error: string | null
}> {
  const { method, headers, body, ...rest } = config || {}
  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: headers || { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...rest,
    })
    console.log(response)
    const data = (await response.json()) as TResponse
    console.log(data)
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
