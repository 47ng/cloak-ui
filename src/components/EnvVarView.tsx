import React from 'react'
import {
  Text,
  Textarea,
  Stack,
  StackProps,
  useTheme,
  Button
} from '@chakra-ui/react'
import { store } from 'src/store'
import { FiCopy, FiPlus, FiRefreshCw } from 'react-icons/fi'

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
          leftIcon={<FiPlus />}
          colorScheme="green"
          variant="ghost"
          onClick={() => store.dispatch('resetKeychain', null)}
        >
          New keychain
        </Button>
        <Button
          size="sm"
          leftIcon={<FiRefreshCw />}
          colorScheme="indigo"
          variant="ghost"
          onClick={() => store.dispatch('rotateMasterKey', null)}
        >
          Rotate Master Key
        </Button>
        <Button size="sm" ml="auto" leftIcon={<FiCopy />} colorScheme="blue">
          Copy
        </Button>
      </Stack>
    </Stack>
  )
}
