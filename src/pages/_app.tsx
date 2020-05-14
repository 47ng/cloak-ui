import { createChakraNextApp } from '@47ng/chakra-next'
import { SentryErrorBoundary } from 'src/services/sentry'

export default createChakraNextApp({
  Providers: ({ children }) => (
    <SentryErrorBoundary>{children}</SentryErrorBoundary>
  )
})
