import { chakraNextTheme } from '@47ng/chakra-next'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    styles: {
      global: ({ colorMode }: { colorMode: 'dark' | 'light' }) => ({
        ...chakraNextTheme.styles.global({ colorMode }),
        html: {
          lineHeight: 1.5,
          minWidth: '320px',
          scrollBehavior: 'smooth',
          fontSmooth: 'auto',
          '-moz-osx-font-smoothing': 'auto'
        },
        '*': {
          borderColor: colorMode === 'light' ? 'gray.300' : 'gray.700'
        },
        '::placeholder': {
          color: colorMode === 'light' ? 'gray.500' : 'gray.500'
        }
      })
    }
  },
  chakraNextTheme
)
