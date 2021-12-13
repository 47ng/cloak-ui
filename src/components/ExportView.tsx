import {
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  Input,
  useClipboard,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react'
import React from 'react'
import { FiCheck, FiCopy, FiLock, FiRefreshCw, FiShare2 } from 'react-icons/fi'
import { getHashUrl, saveToEnv, State } from 'src/store'

export interface ExportViewProps extends FlexProps {
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
    <Flex alignItems="center" flexWrap="wrap" gap={2} {...props}>
      <Heading
        as="h3"
        fontSize="md"
        fontWeight="semibold"
        color={useColorModeValue('gray.800', 'gray.300')}
      >
        <Box
          as={FiLock}
          boxSize={4}
          d="inline-block"
          mr={2}
          mt={-1}
          color={useColorModeValue('gray.600', 'gray.500')}
        />
        Master Key
      </Heading>
      <Input
        ml={1}
        w="md"
        size="sm"
        value={state.masterKey}
        fontFamily={theme.fonts.mono}
        fontSize="xs"
        isReadOnly
      />
      <Button
        size="xs"
        leftIcon={<FiRefreshCw />}
        onClick={onRotateMasterKey}
        variant="ghost"
        mr="auto"
      >
        Rotate
      </Button>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={hasCopiedUrl ? <FiCheck /> : <FiShare2 />}
        onClick={onCopyUrl}
      >
        {hasCopiedUrl ? 'URL copied' : 'Share'}
      </Button>
      <Button
        size="sm"
        leftIcon={hasCopiedEnv ? <FiCheck /> : <FiCopy />}
        colorScheme="blue"
        onClick={onCopyEnv}
      >
        {hasCopiedEnv ? 'Copied' : 'Export'}
      </Button>
    </Flex>
  )
}
