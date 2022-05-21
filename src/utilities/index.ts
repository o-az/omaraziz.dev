export * from './lazy-import'

export const ArrayToChunks = (array: Array<string>, chunkSize: number): Array<string>[] => {
  const items = new Array(Math.ceil(array.length / chunkSize))
  return items.fill(0).map(() => array.splice(0, chunkSize))
}

export const getTimestamp = () => {
  const [timestamp] = new Date().toISOString().split('T')
  return timestamp
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined
