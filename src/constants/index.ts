export const ARTICLES_PATH = import.meta.env.PROD ? './artilces/' : '../../articles'

export const CLOUDFLARE_WORKERS_URL = {
  snippets: {
    endpoint: 'https://test-cw.0101010.workers.dev',
    proxy: '/cf-worker',
  },
}
