/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MY_ENV_VARIABLE: string
  readonly VITE_MY_ENV_VARIABLE: string
  readonly SENTRY_DSN: string
  readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
