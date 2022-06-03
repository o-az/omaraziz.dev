/// <reference types="vite/client" />

interface EnvironmentVariables {
  readonly MY_ENV_VARIABLE: string
  readonly VITE_MY_ENV_VARIABLE: string
  readonly SENTRY_DSN: string
  readonly VITE_SENTRY_DSN: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv extends EnvironmentVariables {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {
    readonly NODE_ENV: string
  }
}
