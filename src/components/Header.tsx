import React from 'react'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import Box from '@chakra-ui/core/dist/Box'
import Text from '@chakra-ui/core/dist/Text'
import Stack from '@chakra-ui/core/dist/Stack'
import Image from '@chakra-ui/core/dist/Image'
import { OutgoingLink } from '@47ng/chakra-next'
import Heading from '@chakra-ui/core/dist/Heading'
import Icon from '@chakra-ui/core/dist/Icon'
import { FiGithub } from 'react-icons/fi'

export interface HeaderProps extends FlexProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Stack isInline spacing={4}>
        <Image src="/logo.png" alt="Gold key emoji" size={12} />
        <Box>
          <Heading as="h1" fontSize="xl" fontWeight="bold">
            Cloak UI
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Manage AES-GCM 256 keys
          </Text>
        </Box>
      </Stack>
      <Stack as="nav" isInline fontWeight="medium" spacing={12}>
        <OutgoingLink
          href="https://github.com/47ng/cloak"
          display="inline-flex"
          alignItems="center"
        >
          <Icon as={FiGithub} mr={2} />
          GitHub
        </OutgoingLink>
      </Stack>
    </Flex>
  )
}
