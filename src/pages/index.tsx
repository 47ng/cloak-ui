import React from 'react'
import { NextPage } from 'next'
import { Container, StackCard } from '@47ng/chakra-next'
import Button from '@chakra-ui/core/dist/Button'

// --

const Crasher = () => {
  throw new Error('Crasher')
}

const IndexPage: NextPage = () => {
  const [crasher, setCrasher] = React.useState(false)
  const run = async () => {
    await new Promise(r => setTimeout(r, 1000))
    throw new Error('in async method')
  }

  return (
    <Container mt={12}>
      <StackCard>
        <Button
          onClick={() => {
            throw new Error('in event handler')
          }}
        >
          Throw in event handler
        </Button>
        <Button onClick={run}>Throw in async method</Button>
        <Button onClick={() => setCrasher(true)}>Throw in render method</Button>
        {crasher && <Crasher />}
      </StackCard>
    </Container>
  )
}

export default IndexPage
