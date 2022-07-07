import { encryptString, generateKey } from '@47ng/cloak'
import {
  Container,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Header } from 'src/components/Header'

const key = generateKey()

const CiphertextLengthCalculator: NextPage = () => {
  const [clearTextLength, setClearTextLength] = React.useState(50)
  const [cipherTextLength, setCipherTextLength] = React.useState<number>(0)

  React.useEffect(() => {
    const clearTextString = Array.from(
      { length: clearTextLength },
      () => 'a'
    ).join('')
    encryptString(clearTextString, key).then(ciphertext =>
      setCipherTextLength(ciphertext.length)
    )
  }, [clearTextLength])

  return (
    <>
      <Head>
        <title>Ciphertext Length Calculator | Cloak UI</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Container maxW="6xl" px={2} my={4}>
        <Header />
      </Container>
      <Container maxW="lg" my={12} px={{ base: 0, sm: 2 }}>
        <Stack spacing={6} alignItems="center">
          <Text>
            What is the maximum length of your clear-text string input?
          </Text>
          <NumberInput
            width="sm"
            mx="auto"
            value={clearTextLength}
            onChange={(_, value) => setClearTextLength(value)}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>
            The corresponding ciphertext length is{' '}
            <Text as="b" fontSize="lg">
              {cipherTextLength}
            </Text>{' '}
            characters long.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

export default CiphertextLengthCalculator
