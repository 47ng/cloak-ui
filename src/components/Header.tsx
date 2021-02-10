import React from 'react'
import {
  Flex,
  FlexProps,
  Box,
  Text,
  Stack,
  Image,
  Heading,
  Icon,
  IconButton,
  useColorMode
} from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'
import { FiGithub, FiMoon, FiSun } from 'react-icons/fi'

export interface HeaderProps extends FlexProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Stack isInline spacing={4}>
        <Image src="/logo.png" alt="Gold key emoji" boxSize={12} />
        <Box>
          <Heading as="h1" fontSize="xl" fontWeight="bold">
            Cloak UI
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Manage AES-GCM 256 keys
          </Text>
        </Box>
      </Stack>
      <Stack as="nav" isInline fontWeight="medium" spacing={4}>
        <OutgoingLink
          href="https://github.com/47ng/cloak"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FiGithub} mr={2} />
          GitHub
        </OutgoingLink>
        <IconButton
          variant="ghost"
          aria-label={colorMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
          isRound
          onMouseDown={toggleColorMode}
        />
      </Stack>
    </Flex>
  )
}
