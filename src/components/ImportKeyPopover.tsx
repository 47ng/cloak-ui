import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import Stack from '@chakra-ui/core/dist/Stack'
import Input from '@chakra-ui/core/dist/Input'
import Button from '@chakra-ui/core/dist/Button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverProps
} from '@chakra-ui/core/dist/Popover'

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
            <PopoverHeader fontWeight="semibold" color="gray.800">
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
                    variantColor="green"
                    leftIcon="add"
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
