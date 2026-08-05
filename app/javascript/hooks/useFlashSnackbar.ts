import { SnackbarState } from './../types/snackbar'
import { FlashData } from '@/types'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export function useFlashSnackbar() {
  const { flash } = usePage() as { flash: FlashData }

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    if (flash.alert) {
      setSnackbar({
        open: true,
        message: flash.alert,
        severity: 'error',
      })
    } else if (flash.notice) {
      setSnackbar({
        open: true,
        message: flash.notice,
        severity: 'success',
      })
    }
  }, [flash.alert, flash.notice])

  const closeSnackbar = () => {
    setSnackbar((current) => ({
      ...current,
      open: false,
    }))
  }

  return {
    snackbar,
    closeSnackbar,
  }
}
