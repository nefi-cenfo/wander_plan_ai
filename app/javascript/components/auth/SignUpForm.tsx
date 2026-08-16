import { useForm, usePage } from '@inertiajs/react'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'

const textFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'background.default',
  },
}

export default function SignUpForm() {
  const { flash } = usePage()
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    })

  const validateForm = () => {
    let isValid = true

    clearErrors()

    if (!data.user.name.trim()) {
      setError('user.name', ['Name is required.'])
      isValid = false
    }

    if (!data.user.lastname.trim()) {
      setError('user.lastname', ['Last name is required.'])
      isValid = false
    }

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
    } else if (data.user.password.length < 6) {
      setError('user.password', ['Password must be at least 6 characters.'])
      isValid = false
    }

    if (!data.user.password_confirmation) {
      setError('user.password_confirmation', [
        'Password confirmation is required.',
      ])
      isValid = false
    } else if (data.user.password_confirmation !== data.user.password) {
      setError('user.password_confirmation', ['Passwords do not match.'])
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (validateForm()) {
      post('/users')
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
        Create your account
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Start planning smarter trips with WanderPlan
      </Typography>

      {flash.alert && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {flash.alert}
        </Alert>
      )}

      <TextField
        fullWidth
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        margin="normal"
        value={data.user.name}
        onChange={(e) => setData('user.name', e.target.value)}
        error={!!errors['user.name']}
        helperText={errors['user.name']}
        autoFocus
        sx={textFieldSx}
      />

      <TextField
        fullWidth
        id="lastname"
        label="Last name"
        type="text"
        variant="outlined"
        margin="normal"
        value={data.user.lastname}
        onChange={(e) => setData('user.lastname', e.target.value)}
        error={!!errors['user.lastname']}
        helperText={errors['user.lastname']}
        sx={textFieldSx}
      />

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
        sx={textFieldSx}
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
        sx={textFieldSx}
      />

      <TextField
        fullWidth
        id="password_confirmation"
        label="Confirm password"
        type="password"
        variant="outlined"
        margin="normal"
        value={data.user.password_confirmation}
        onChange={(e) => setData('user.password_confirmation', e.target.value)}
        error={!!errors['user.password_confirmation']}
        helperText={errors['user.password_confirmation']}
        sx={textFieldSx}
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
          boxShadow: `0 14px 30px ${theme.palette.secondary.main}30`,
          '&:hover': {
            boxShadow: `0 18px 36px ${theme.palette.secondary.main}3D`,
          },
          '&.Mui-disabled': {
            background: theme.palette.action.disabledBackground,
            boxShadow: 'none',
          },
        })}
      >
        {processing ? 'Creating account...' : 'Sign Up'}
      </Button>
    </Box>
  )
}
