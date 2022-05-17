/// <reference types="vite/client" />

interface EnvVariables {
  readonly MY_ENV_VARIABLE: string
  readonly VITE_MY_ENV_VARIABLE: string
  readonly VITE_SENTRY_DSN: string
}

type ImportMetaEnv = EnvVariables

interface ImportMeta {
  readonly env: ImportMetaEnv
}
