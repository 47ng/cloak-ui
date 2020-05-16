import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import Heading from '@chakra-ui/core/dist/Heading'
import Input from '@chakra-ui/core/dist/Input'
import Button from '@chakra-ui/core/dist/Button'
import useClipboard from '@chakra-ui/core/dist/useClipboard'
import { State, saveToEnv, getHashUrl } from 'src/store'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import Box from '@chakra-ui/core/dist/Box'
import { FiShare2, FiLock } from 'react-icons/fi'

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
          size={4}
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
        leftIcon="repeat"
        onClick={onRotateMasterKey}
        variant="ghost"
      >
        Rotate
      </Button>
      <Button
        variant="ghost"
        ml="auto"
        size="sm"
        leftIcon={hasCopiedUrl ? 'check' : FiShare2}
        onClick={onCopyUrl}
      >
        {hasCopiedUrl ? 'URL copied' : 'Share'}
      </Button>
      <Button
        size="sm"
        leftIcon={hasCopiedEnv ? 'check' : 'copy'}
        variantColor="blue"
        onClick={onCopyEnv}
      >
        {hasCopiedEnv ? 'Copied' : 'Export'}
      </Button>
    </Stack>
  )
}
