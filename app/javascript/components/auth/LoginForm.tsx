import {useForm, usePage} from '@inertiajs/react'
import {Alert, Box, Button, TextField, Typography} from '@mui/material'
import React from 'react'

export default function LoginForm() {
  const {flash} = usePage().props as any
  const {data, setData, post, processing, errors, setError, clearErrors} =
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
        gutterBottom
        align="center"
        sx={{color: 'primary.main', fontWeight: 'bold'}}
      >
        WanderPlan
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        color="text.secondary"
        sx={{marginBottom: 3}}
      >
        Log in to continue your journey
      </Typography>

      {flash.alert && (
        <Alert severity="error" sx={{mb: 3}}>
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
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={processing}
        sx={{mt: 4, py: 1.5}}
      >
        {processing ? 'Validating...' : 'Log In'}
      </Button>
    </Box>
  )
}
