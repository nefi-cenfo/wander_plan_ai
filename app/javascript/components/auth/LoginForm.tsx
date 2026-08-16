import { useForm, usePage } from '@inertiajs/react'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function LoginForm() {
  const { flash } = usePage()
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      user: {
        email: '',
        password: '',
      },
    })

  const validateForm = () => {
    let isValid = true

    clearErrors()

    if (!data.user.email.trim()) {
      setError('user.email', ['Email is required.'])
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(data.user.email)) {
      setError('user.email', ['Email format is required.'])
      isValid = false
    }

    if (!data.user.password) {
      setError('user.password', ['Password is required.'])
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (validateForm()) {
      post('/users/sign_in')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ color: 'text.primary', fontWeight: 800, letterSpacing: -0.5 }}
      >
        Welcome back
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Log in to continue your WanderPlan journey
      </Typography>

      {flash.alert && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {flash.alert}
        </Alert>
      )}

      <TextField
        fullWidth
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        value={data.user.email}
        onChange={(e) => setData('user.email', e.target.value)}
        error={!!errors['user.email']}
        helperText={errors['user.email']}
        autoFocus
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.default',
          },
        }}
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={data.user.password}
        onChange={(e) => setData('user.password', e.target.value)}
        error={!!errors['user.password']}
        helperText={errors['user.password']}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'background.default',
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={processing}
        disableElevation
        sx={(theme) => ({
          mt: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 700,
          textTransform: 'none',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: `0 14px 30px ${theme.palette.primary.main}33`,
          '&:hover': {
            boxShadow: `0 18px 36px ${theme.palette.primary.main}40`,
          },
          '&.Mui-disabled': {
            background: theme.palette.action.disabledBackground,
            boxShadow: 'none',
          },
        })}
      >
        {processing ? 'Validating...' : 'Log In'}
      </Button>
    </Box>
  )
}
