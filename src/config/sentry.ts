import type { BrowserOptions } from '@sentry/browser'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import { environment } from '@/env'

const { SENTRY_DSN, PROD } = environment

const sentryConfig: BrowserOptions = {
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
}

if (PROD) {
  Sentry.init(sentryConfig)
}
