export const environment = {
  MY_ENV_VARIABLE: import.meta.env.VITE_MY_ENV_VARIABLE,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR,
  NODE_ENV: process.env.NODE_ENV,
}
