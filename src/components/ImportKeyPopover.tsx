import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

export type ImportKeyPopoverProps = PopoverProps & {
  onSubmit: (key: string) => Promise<void>
}

export const ImportKeyPopover: React.FC<ImportKeyPopoverProps> = ({
  onSubmit,
  children,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<Error | null>(null)
  return (
    <Popover
      initialFocusRef={inputRef}
      onOpen={() => setError(null)}
      {...props}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent zIndex={4} overflow="hidden">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'gray.200')}
            >
              Import key
            </PopoverHeader>
            <PopoverBody>
              <form
                onSubmit={e => {
                  setError(null)
                  e.preventDefault()
                  const key = inputRef.current?.value
                  if (!key) {
                    return
                  }
                  onSubmit(key)
                    .then(() => {
                      if (onClose) {
                        onClose()
                      }
                    })
                    .catch(setError)
                }}
              >
                <Stack
                  spacing={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Text fontSize="sm">Paste the key to import:</Text>
                  <Input
                    name="importedKey"
                    size="sm"
                    ref={inputRef}
                    isInvalid={!!error}
                    errorBorderColor="red.500"
                  />
                  <Button
                    type="submit"
                    ml="auto"
                    size="sm"
                    colorScheme="green"
                    leftIcon={<FiPlus />}
                  >
                    Add key
                  </Button>
                </Stack>
              </form>
            </PopoverBody>
            {error && (
              <PopoverFooter bg="red.100" borderTopColor="red.200">
                <Text color="red.700" fontWeight="medium" fontSize="xs">
                  {error.toString()}
                </Text>
              </PopoverFooter>
            )}
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
