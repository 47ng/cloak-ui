import { defaultTheme } from '@47ng/chakra-next'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    styles: {
      global: ({ colorMode }) => ({
        html: {
          lineHeight: 1.5,
          minWidth: '320px',
          scrollBehavior: 'smooth',
          fontSmooth: 'auto',
          '-moz-osx-font-smoothing': 'auto'
        },
        'html, body': {
          bg: colorMode === 'light' ? 'gray.200' : 'gray.1000',
          color: colorMode === 'light' ? 'gray.800' : 'gray.400'
        },
        '*': {
          borderColor: colorMode === 'light' ? 'gray.400' : 'gray.700'
        },
        '::placeholder': {
          color: colorMode === 'light' ? 'gray.500' : 'gray.500'
        }
      })
    }
  },
  defaultTheme as any
)
