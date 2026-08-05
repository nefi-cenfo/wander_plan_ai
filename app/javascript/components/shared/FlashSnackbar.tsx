import { useFlashSnackbar } from '@/hooks/useFlashSnackbar'
import { Alert, Snackbar } from '@mui/material'

export default function FlashSnackbar() {
  const { snackbar, closeSnackbar } = useFlashSnackbar()

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        onClose={closeSnackbar}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}
