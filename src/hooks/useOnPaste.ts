import React from 'react'

export function useOnPaste(callback: (text: string) => void) {
  React.useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    const onPaste = (e: ClipboardEvent) => {
      const data = e.clipboardData?.getData('text/plain')
      if (data) {
        callback(data)
      }
    }
    body.addEventListener('paste', onPaste)
    return () => {
      body.removeEventListener('paste', onPaste)
    }
  }, [callback])
}
