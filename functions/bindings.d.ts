export {}

declare global {
  const CLIENT_ID: string
  const CLIENT_SECRET: string
  const GITHUB_API_TOKEN: string
  interface Window {
    caches: Caches
  }
  interface Caches {
    default: {
      put(request: Request | string, response: Response): Promise<undefined>
      match(request: Request | string): Promise<Response | undefined>
    }
  }

  const caches: Caches

  interface GlobalCaches {
    caches: Caches
  }
}
