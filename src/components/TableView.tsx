import {
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  StackProps,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { FiPlus, FiUpload } from 'react-icons/fi'
import { Key } from 'src/types'
import { ImportKeyPopover } from './ImportKeyPopover'
import { KeyCard, KeyCardProps } from './KeyCard'

export interface TableViewProps extends StackProps {
  keys: Key[]
  currentKeyFingerprint?: string
  onSetCurrentKey: KeyCardProps['onSetCurrent']
  onDeleteKey: KeyCardProps['onDelete']
  onEditKeyLabel: KeyCardProps['onEditLabel']
  onImportKey: (key: string) => Promise<void>
  onNewKey: () => void
}

export const TableView: React.FC<TableViewProps> = ({
  keys,
  currentKeyFingerprint,
  onSetCurrentKey,
  onDeleteKey,
  onEditKeyLabel,
  onImportKey,
  onNewKey,
  ...props
}) => {
  const buttonSize = useBreakpointValue({ base: 'md', sm: 'sm' })
  return (
    <Stack spacing={4} {...props}>
      <Flex
        as="header"
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems="baseline"
        rowGap={2}
        px={4}
      >
        <Heading
          as="h2"
          fontSize="lg"
          fontWeight="semibold"
          color={useColorModeValue('gray.800', 'gray.300')}
        >
          Keychain
        </Heading>
        <Spacer />
        <Flex as="nav" gap={2} w={{ base: '100%', sm: 'auto' }}>
          <ImportKeyPopover onSubmit={onImportKey}>
            <Button
              size={buttonSize}
              leftIcon={<FiUpload />}
              variant="outline"
              flex={1}
            >
              Import key
            </Button>
          </ImportKeyPopover>
          <Button
            size={buttonSize}
            leftIcon={<FiPlus />}
            colorScheme="green"
            onClick={onNewKey}
            flex={1}
          >
            New key
          </Button>
        </Flex>
      </Flex>
      {keys.length > 0 ? (
        <Stack
          spacing={8}
          py={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.300', 'gray.800')}
            />
          }
        >
          {keys
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(({ serialized, parsed, createdAt, label }) => (
              <KeyCard
                px={4}
                key={serialized}
                serialized={serialized}
                fingerprint={parsed.fingerprint}
                createdAt={createdAt}
                label={label}
                onDelete={onDeleteKey}
                onSetCurrent={onSetCurrentKey}
                onEditLabel={onEditKeyLabel}
                isCurrent={parsed.fingerprint === currentKeyFingerprint}
              />
            ))}
        </Stack>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          py={4}
          fontSize="sm"
          color="gray.500"
        >
          Your keychain is empty, create a new key to get started
        </Flex>
      )}
    </Stack>
  )
}
