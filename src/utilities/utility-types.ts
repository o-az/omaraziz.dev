export type SomeRequired<T, KRequired extends keyof T> = Pick<T, KRequired> & {
  [key in Exclude<keyof T, KRequired>]?: T[key]
}
// Pick<T, Exclude<keyof T, KRequired>> & {
//   [K in KRequired]-?: T[K] extends undefined ? never : T[K]
// }

export type PickWithOptional<T, KRequired extends keyof T, KOptional extends keyof T> = Pick<T, KRequired> &
  Partial<Pick<T, KOptional>>
