import {
  Button,
  ButtonProps,
  forwardRef,
  useClipboard,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

export interface CopyFieldButtonProps extends ButtonProps {
  value: string
}

export function useFieldActionButtonProps(): ButtonProps {
  const bg = useColorModeValue('gray.200', 'gray.900')
  const hover = useColorModeValue('gray.300', 'gray.800')
  return {
    bg,
    _hover: {
      bg: hover
    }
  }
}

export const CopyFieldButton = forwardRef<CopyFieldButtonProps, 'button'>(
  ({ value, ...props }, ref) => {
    const { onCopy, hasCopied } = useClipboard(value)
    const actionButtonProps = useFieldActionButtonProps()
    return (
      <Button
        onClick={onCopy}
        leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
        ref={ref}
        {...actionButtonProps}
        {...props}
      >
        Copy
      </Button>
    )
  }
)
