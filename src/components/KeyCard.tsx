import {
  Badge,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  Spacer,
  Stack,
  StackProps,
  Text,
  useClipboard,
  useColorModeValue
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { FiCheck, FiCopy, FiTrash2 } from 'react-icons/fi'
import { IoKey } from 'react-icons/io5'

dayjs.extend(relativeTime)

export interface KeyCardProps extends StackProps {
  serialized: string
  createdAt: number
  fingerprint: string
  isCurrent: boolean
  label?: string
  onSetCurrent: (fingerprint: string) => void
  onDelete: (fingerprint: string) => void
  onEditLabel: (fingerprint: string, label: string) => void
}

export const KeyCard = forwardRef<KeyCardProps, 'div'>(
  (
    {
      serialized,
      createdAt,
      fingerprint,
      isCurrent,
      label,
      onSetCurrent,
      onDelete,
      onEditLabel,
      ...props
    },
    ref
  ) => {
    const { onCopy, hasCopied } = useClipboard(serialized)
    return (
      <Stack ref={ref} {...props}>
        <InputGroup size="sm">
          <InputLeftElement>
            <Box as={IoKey} color={useColorModeValue('gray.500', 'gray.600')} />
          </InputLeftElement>
          <Input isReadOnly value={serialized} fontFamily="mono" rounded="md" />
          <InputRightElement w="4.5rem">
            <Button
              leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
              size="xs"
              aria-label="Copy"
              onClick={onCopy}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex alignItems="center" gap={2}>
          <Badge
            px={1.5}
            rounded="md"
            textTransform="lowercase"
            fontWeight={isCurrent ? 'semibold' : 'normal'}
            fontFamily="mono"
            colorScheme={isCurrent ? 'indigo' : 'gray'}
          >
            {fingerprint}
          </Badge>
          <Radio
            size="sm"
            colorScheme="indigo"
            isChecked={isCurrent}
            onClick={() => onSetCurrent(fingerprint)}
          >
            Use for encryption
          </Radio>
          <Spacer />
          <Text fontSize="xs" color="gray.600">
            Added {dayjs(createdAt).fromNow()}
          </Text>
          <IconButton
            aria-label="Delete"
            icon={<FiTrash2 />}
            variant="ghost"
            rounded="full"
            size="xs"
            onClick={() => onDelete(fingerprint)}
          >
            Delete
          </IconButton>
        </Flex>
        <Editable
          defaultValue={label}
          onSubmit={value => onEditLabel(fingerprint, value)}
          fontSize="sm"
          placeholder="Add a label"
          fontStyle={label ? undefined : 'italic'}
          color={label ? 'current' : 'gray.600'}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Stack>
    )
  }
)
