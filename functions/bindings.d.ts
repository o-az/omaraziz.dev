/// <reference types="@cloudflare/workers-types" />

export {}

declare global {
  const MY_ENV_VAR: string
  const MY_SECRET: string
  const myKVNamespace: KVNamespace
}
