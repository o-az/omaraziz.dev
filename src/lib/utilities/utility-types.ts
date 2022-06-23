export type SomeRequired<T, KRequired extends keyof T> = Pick<T, KRequired> & {
  [key in Exclude<keyof T, KRequired>]?: T[key];
};

export type PickWithOptional<T, KRequired extends keyof T, KOptional extends keyof T> = Pick<T, KRequired> &
  Partial<Pick<T, KOptional>>;
