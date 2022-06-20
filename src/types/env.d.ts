/// <reference types="vite/client" />

interface EnvironmentVariables {
  readonly MY_ENV_VARIABLE: string;
  readonly VITE_MY_ENV_VARIABLE: string;
  readonly SENTRY_DSN: string;
  readonly VITE_SENTRY_DSN: string;
  readonly GISCUS_HTML_SCRIPT: string;
  readonly GITHUB_API_TOKEN: string;
  readonly GITHUB_APP_ID: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly GITHUB_CLIENT_SECRET: string;
  readonly GITHUB_CALLBACK_URL: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv extends EnvironmentVariables {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {
    readonly NODE_ENV: string;
  }
}
