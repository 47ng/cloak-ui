import React from 'react'
import {
  Stack,
  StackProps,
  Heading,
  Input,
  Button,
  useClipboard,
  useTheme,
  Box
} from '@chakra-ui/react'
import { State, saveToEnv, getHashUrl } from 'src/store'
import { FiShare2, FiLock, FiRefreshCw, FiCheck, FiCopy } from 'react-icons/fi'

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
    <Stack isInline {...props} display="flex" alignItems="center">
      <Heading as="h3" fontSize="md" fontWeight="semibold" color="gray.800">
        <Box
          as={FiLock}
          boxSize={4}
          d="inline-block"
          mr={2}
          mt={-1}
          color="gray.600"
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
    </Stack>
  )
}
