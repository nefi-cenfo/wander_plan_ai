import SignUpForm from '@/components/auth/SignUpForm'
import { Box } from '@mui/material'

export default function SignUp() {
  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <SignUpForm />
    </Box>
  )
}
