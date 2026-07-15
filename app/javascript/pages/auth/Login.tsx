import LoginForm from '@/components/auth/LoginForm'
import {Box} from '@mui/material'

export default function Login() {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <LoginForm />
    </Box>
  )
}
