/// <reference types="vite/client" />

interface EnvVariables {
  readonly MY_ENV_VARIABLE: string
  readonly VITE_MY_ENV_VARIABLE: string
  readonly VITE_SENTRY_DSN: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvVariables {}
}

interface ImportMetaEnv extends EnvVariables {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
