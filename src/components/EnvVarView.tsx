import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import Textarea from '@chakra-ui/core/dist/Textarea'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import Button from '@chakra-ui/core/dist/Button'
import { store } from 'src/store'

export interface EnvVarViewProps extends StackProps {}

export const EnvVarView: React.FC<EnvVarViewProps> = ({ ...props }) => {
  const theme = useTheme()
  return (
    <Stack {...props}>
      <Text fontSize="xs" color="gray.600">
        Tip: paste your Cloak environment variables anywhere
      </Text>
      <Textarea
        fontFamily={theme.fonts.mono}
        fontSize="sm"
        bg="gray.300"
        color="gray.700"
      />
      <Stack isInline display="flex">
        <Button
          size="sm"
          leftIcon="add"
          variantColor="green"
          variant="ghost"
          onClick={() => store.dispatch('resetKeychain', null)}
        >
          New keychain
        </Button>
        <Button
          size="sm"
          leftIcon="repeat"
          variantColor="indigo"
          variant="ghost"
          onClick={() => store.dispatch('rotateMasterKey', null)}
        >
          Rotate Master Key
        </Button>
        <Button size="sm" ml="auto" leftIcon="copy" variantColor="blue">
          Copy
        </Button>
      </Stack>
    </Stack>
  )
}
