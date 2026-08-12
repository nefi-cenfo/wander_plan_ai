import { router } from '@inertiajs/react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = router.on('start', () => setLoading(true))
    const finish = router.on('finish', () => setLoading(false))

    return () => {
      start()
      finish()
    }
  }, [])

  return (
    <Backdrop
      open={loading}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
