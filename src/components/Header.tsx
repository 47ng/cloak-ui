import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import {
  Box,
  Flex,
  FlexProps,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/react'
import React from 'react'
import { FiGithub, FiMoon, FiSun } from 'react-icons/fi'
import { IoCalculatorOutline } from 'react-icons/io5'

export interface HeaderProps extends FlexProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="header"
      alignItems="center"
      flexWrap="wrap-reverse"
      gap={8}
      {...props}
    >
      <Stack isInline spacing={4}>
        <RouteLink to="/">
          <Image src="/logo.png" alt="Gold key emoji" boxSize={12} />
        </RouteLink>
        <Box>
          <Heading as="h1" fontSize="xl" fontWeight="bold">
            Cloak UI
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Manage AES-GCM 256 keys
          </Text>
        </Box>
      </Stack>
      <RouteLink
        to="/ciphertext-length-calculator"
        mr={12}
        fontSize="sm"
        fontWeight="medium"
      >
        <Icon
          as={IoCalculatorOutline}
          mr={1}
          verticalAlign="middle"
          mt="-3px"
        />
        Ciphertext Length Calculator
      </RouteLink>
      <Stack as="nav" isInline fontWeight="medium" spacing={4} ml="auto">
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
