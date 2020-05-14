import React from 'react'
import * as Sentry from '@sentry/browser'
import { Debug, CaptureConsole } from '@sentry/integrations'
import { Container, StackCard } from '@47ng/chakra-next'
import Heading from '@chakra-ui/core/dist/Heading'
import Button from '@chakra-ui/core/dist/Button'
import Stack from '@chakra-ui/core/dist/Stack'
import Text from '@chakra-ui/core/dist/Text'
import List, { ListItem } from '@chakra-ui/core/dist/List'
import { FiRefreshCw, FiSend } from 'react-icons/fi'

export function setupSentry(options: Sentry.BrowserOptions = {}) {
  const integrations =
    process.env.NODE_ENV === 'development'
      ? [new Debug()]
      : [new CaptureConsole()]

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    enabled: !!process.env.SENTRY_DSN,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
    integrations,
    ...options,
    release: options.release ?? process.env.SENTRY_RELEASE
  })

  function captureException(err: any, ctx: any) {
    Sentry.configureScope(scope => {
      if (err.message) {
        // De-duplication currently doesn't work correctly for SSR / browser errors
        // so we force deduplication by error message if it is present
        scope.setFingerprint([err.message])
      }

      if (err.statusCode) {
        scope.setExtra('statusCode', err.statusCode)
      }

      if (!ctx) {
        return
      }
      const { req, res, errorInfo, query, pathname } = ctx

      if (res && res.statusCode) {
        scope.setExtra('statusCode', res.statusCode)
      }

      if (typeof window !== 'undefined') {
        scope.setTag('ssr', 'false')
        scope.setExtras({
          query,
          pathname
        })
      } else {
        scope.setTag('ssr', 'true')
        scope.setExtras({
          url: req?.url,
          method: req?.method,
          headers: req?.headers,
          params: req?.params,
          query: req?.query
        })
      }
      if (errorInfo) {
        Object.keys(errorInfo).forEach(key =>
          scope.setExtra(key, errorInfo[key])
        )
      }
    })

    return Sentry.captureException(err)
  }

  return {
    captureException
  }
}

// --

export interface SentryErrorBoundaryProps {
  onErrorMessage?: JSX.Element
}

export class SentryErrorBoundary extends React.Component<
  SentryErrorBoundaryProps
> {
  static sentry = setupSentry()

  state = {
    hasError: false,
    errorEventId: undefined
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    console.dir({ _: 'getDerivedStateFromError' })
    return { hasError: true }
  }

  componentDidCatch(error: Error | null, errorInfo: object) {
    console.dir({
      _: 'componentDidCatch',
      error,
      errorInfo
    })
    const errorEventId = SentryErrorBoundary.sentry.captureException(error, {
      errorInfo
    })
    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId })
  }

  showReportDialog = () => {
    Sentry.showReportDialog({
      eventId: this.state.errorEventId
    })
  }

  reload = () => {
    window.location.reload(true)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.onErrorMessage) {
        return this.props.onErrorMessage
      }
      return (
        <Container my={8}>
          <StackCard as="section" spacing={6}>
            <Heading as="h2" fontSize="xl" fontWeight="medium" color="red.700">
              Snap, something broke ! 💔
            </Heading>
            <Stack>
              <Text>
                We're sorry you ended up here, that's our fault. An anonymous
                error report has been sent, we'll be on it in no time.
              </Text>
              <Text>To help make our service better, you can:</Text>
              <List listStyleType="numbered">
                <ListItem>Tell us how you got here</ListItem>
                <ListItem>Reload the page</ListItem>
              </List>
            </Stack>
            <Stack isInline>
              <Button
                variantColor="green"
                leftIcon={FiSend}
                onClick={this.showReportDialog}
              >
                Report this error
              </Button>
              <Button leftIcon={FiRefreshCw} onClick={this.reload}>
                Reload the page
              </Button>
            </Stack>
          </StackCard>
        </Container>
      )
    }
    return this.props.children
  }
}
