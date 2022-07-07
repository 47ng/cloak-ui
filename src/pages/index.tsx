import { cardProps } from '@47ng/chakra-next'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { ExportView } from 'src/components/ExportView'
import { Header } from 'src/components/Header'
import { TableView } from 'src/components/TableView'
import { useOnPaste } from 'src/hooks/useOnPaste'
import { store, useState } from 'src/store'

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
      <Container maxW="4xl" my={12} px={{ base: 0, sm: 2 }}>
        <Stack spacing={6}>
          <Text as="em" fontSize="xs" color="gray.600" textAlign="center">
            Tip: paste your Cloak environment variables anywhere
          </Text>
          <Box
            {...cardProps}
            as="section"
            px={0}
            borderWidth="1px"
            borderStartWidth={{ base: 0, sm: '1px' }}
            borderEndWidth={{ base: 0, sm: '1px' }}
            rounded={{ base: 'none', sm: 'md' }}
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
              onEditKeyLabel={(fingerprint, label) =>
                store.dispatch('editKeyLabel', { fingerprint, label })
              }
              onNewKey={() => store.dispatch('createKey', null)}
              onImportKey={key => store.dispatch('importKey', key)}
            />
          </Box>
          <ExportView
            onRotateMasterKey={() => store.dispatch('rotateMasterKey', null)}
            state={state}
            px={2}
          />
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
