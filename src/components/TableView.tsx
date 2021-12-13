import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Radio,
  Spacer,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { FiPlus, FiTrash2, FiUpload } from 'react-icons/fi'
import { Key } from 'src/types'
import { ImportKeyPopover } from './ImportKeyPopover'

dayjs.extend(relativeTime)

export interface TableViewProps extends StackProps {
  keys: Key[]
  currentKeyFingerprint?: string
  onSetCurrentKey: RowProps['onSetCurrent']
  onDeleteKey: RowProps['onDelete']
  onImportKey: (key: string) => Promise<void>
  onNewKey: () => void
}

export const TableView: React.FC<TableViewProps> = ({
  keys,
  currentKeyFingerprint,
  onSetCurrentKey,
  onDeleteKey,
  onImportKey,
  onNewKey,
  ...props
}) => {
  const buttonSize = useBreakpointValue({ base: 'md', sm: 'sm' })
  return (
    <Stack spacing={4}>
      <Flex
        as="header"
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems="baseline"
        rowGap={2}
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
        <Grid templateColumns="4rem 6rem 4fr 1fr 2rem" {...props} gridGap={2}>
          <>
            <Text fontSize="sm" fontWeight="semibold" textAlign="center">
              Current
            </Text>
            <Text fontSize="sm" fontWeight="semibold" textAlign="center">
              Fingerprint
            </Text>
            <Text fontSize="sm" fontWeight="semibold" textAlign="left">
              Key
            </Text>
            <Text fontSize="sm" fontWeight="semibold" textAlign="right">
              Created
            </Text>
            <Box />
          </>
          {keys
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(({ serialized, parsed, createdAt }) => (
              <Row
                key={serialized}
                serialized={serialized}
                fingerprint={parsed.fingerprint}
                createdAt={createdAt}
                onDelete={onDeleteKey}
                onSetCurrent={onSetCurrentKey}
                isCurrent={parsed.fingerprint === currentKeyFingerprint}
              />
            ))}
        </Grid>
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

// --

interface RowProps {
  isCurrent: boolean
  serialized: string
  fingerprint: string
  createdAt: number
  onSetCurrent: (fingerprint: string) => void
  onDelete: (fingerprint: string) => void
}

const Row: React.FC<RowProps> = ({
  isCurrent,
  serialized,
  fingerprint,
  createdAt,
  onSetCurrent,
  onDelete
}) => {
  const theme = useTheme()
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Radio
          size="sm"
          colorScheme="indigo"
          isChecked={isCurrent}
          onClick={() => onSetCurrent(fingerprint)}
        />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        fontFamily={theme.fonts.mono}
        fontSize="xs"
        fontWeight="semibold"
      >
        <Badge
          borderRadius="3px"
          textTransform="lowercase"
          fontWeight="semibold"
          fontFamily={theme.fonts.mono}
          variant="subtle"
          color="gray.700"
        >
          {fingerprint}
        </Badge>
      </Flex>
      <Flex alignItems="center" fontFamily={theme.fonts.mono} fontSize="xs">
        {serialized}
      </Flex>
      <Flex
        fontSize="xs"
        justifyContent="flex-end"
        alignItems="center"
        color="gray.600"
      >
        {dayjs(createdAt).fromNow()}
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <IconButton
          aria-label="Delete"
          icon={<FiTrash2 />}
          variant="ghost"
          size="xs"
          onClick={() => onDelete(fingerprint)}
        >
          Delete
        </IconButton>
      </Flex>
    </>
  )
}
