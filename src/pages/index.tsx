import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Text, Container, Stack, useColorModeValue } from '@chakra-ui/react'
import { Card } from '@47ng/chakra-next'
import { Header } from 'src/components/Header'
import { TableView } from 'src/components/TableView'
import { store, useState } from 'src/store'
import { useOnPaste } from 'src/hooks/useOnPaste'
import { ExportView } from 'src/components/ExportView'

const onPaste = (text: string) => store.dispatch('loadFromPaste', text)

const IndexPage: NextPage = () => {
  const state = useState()
  useOnPaste(onPaste)

  return (
    <>
      <Head>
        <title>Cloak UI</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Container maxW="6xl" px={2} my={4}>
        <Header />
      </Container>
      <Container maxW="4xl" my={12}>
        <Stack spacing={6}>
          <Text fontSize="xs" color="gray.600">
            Tip: paste your Cloak environment variables anywhere
          </Text>
          <Card
            borderWidth="1px"
            borderColor={useColorModeValue('gray.400', 'gray.700')}
          >
            <TableView
              keys={state.keys}
              currentKeyFingerprint={state.currentKeyFingerprint}
              onDeleteKey={fingerprint =>
                store.dispatch('deleteKey', fingerprint)
              }
              onSetCurrentKey={fingerprint =>
                store.dispatch('selectCurrentKey', fingerprint)
              }
              onNewKey={() => store.dispatch('createKey', null)}
              onImportKey={key => store.dispatch('importKey', key)}
            />
          </Card>
          <ExportView
            onRotateMasterKey={() => store.dispatch('rotateMasterKey', null)}
            state={state}
          />
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
