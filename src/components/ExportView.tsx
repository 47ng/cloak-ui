import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackProps,
  Textarea,
  useClipboard,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react'
import React from 'react'
import {
  FiCheck,
  FiCode,
  FiCopy,
  FiLink,
  FiLock,
  FiRefreshCw
} from 'react-icons/fi'
import { getHashUrl, saveToEnv, State } from 'src/store'

export interface ExportViewProps extends StackProps {
  state: State
  onRotateMasterKey: () => void
}

export const ExportView: React.FC<ExportViewProps> = ({
  state,
  onRotateMasterKey,
  ...props
}) => {
  const theme = useTheme()
  const [env, setEnv] = React.useState('')

  React.useEffect(() => {
    if (state.masterKey === '') {
      return
    }
    saveToEnv(state).then(setEnv)
  }, [state])

  const url = getHashUrl(env)

  const { onCopy: onCopyEnv, hasCopied: hasCopiedEnv } = useClipboard(env)
  const { onCopy: onCopyUrl, hasCopied: hasCopiedUrl } = useClipboard(url)

  return (
    <Stack spacing={6} {...props}>
      <FormControl>
        <FormLabel d="flex" alignItems="center">
          <Box
            as={FiLock}
            boxSize={4}
            d="inline-block"
            mr={2}
            color={useColorModeValue('gray.600', 'gray.500')}
          />{' '}
          Master Key
        </FormLabel>
        <InputGroup size="sm">
          <Input
            rounded="md"
            value={state.masterKey}
            fontFamily={theme.fonts.mono}
            fontSize="xs"
            isReadOnly
          />
          <InputRightElement w="5rem">
            <Button
              size="xs"
              leftIcon={<FiRefreshCw />}
              onClick={onRotateMasterKey}
              mr="auto"
            >
              Rotate
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel d="flex" alignItems="center">
          <Box
            as={FiLink}
            boxSize={4}
            d="inline-block"
            mr={2}
            color={useColorModeValue('gray.600', 'gray.500')}
          />{' '}
          Sharing URL
        </FormLabel>
        <InputGroup size="sm">
          <Input rounded="md" value={url} isReadOnly />
          <InputRightElement w="4.5rem">
            <Button
              leftIcon={hasCopiedUrl ? <FiCheck /> : <FiCopy />}
              size="xs"
              aria-label="Copy URL"
              onClick={onCopyUrl}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel d="flex" alignItems="center">
          <Box
            as={FiCode}
            boxSize={4}
            d="inline-block"
            mr={2}
            color={useColorModeValue('gray.600', 'gray.500')}
          />{' '}
          Environment Variables
        </FormLabel>
        <InputGroup size="sm">
          <Textarea
            rounded="md"
            value={env}
            isReadOnly
            resize="vertical"
            fontFamily="mono"
            fontSize="xs"
            rows={2}
          />
          <InputRightElement w="4.5rem">
            <Button
              leftIcon={hasCopiedEnv ? <FiCheck /> : <FiCopy />}
              size="xs"
              aria-label="Copy environment variables"
              onClick={onCopyEnv}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Stack>
  )
}
