import {Link} from '@inertiajs/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function HomeHeader() {
  return (
    <Container fixed maxWidth="xl" className="mbs-8">
      <header>
        <Box className="flex flex-row flex-nowrap">
          <Typography
            className="text-center flex-auto"
            variant="h1"
            sx={{
              color: 'primary.main',
              fontSize: '1.7rem',
              fontWeight: 'bold',
            }}
          >
            WanderPlan
          </Typography>
          <span>
            <Button
              LinkComponent={Link}
              variant="text"
              sx={{marginRight: '0.8rem'}}
              href="/users/sign_in"
            >
              Login
            </Button>
            <Button
              LinkComponent={Link}
              variant="contained"
              href="/users/sign_up"
            >
              Sign Up
            </Button>
          </span>
        </Box>
      </header>
    </Container>
  )
}
