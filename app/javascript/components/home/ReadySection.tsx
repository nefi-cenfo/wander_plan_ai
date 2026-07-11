import {Box, Button, Container, Typography} from '@mui/material'

export default function ReadySection() {
  return (
    <Container fixed maxWidth="xl">
      <Box className="py-20 flex flex-col items-center">
        <Typography
          variant="h3"
          className="text-center"
          sx={{fontWeight: '700'}}
        >
          Ready to map your world?
        </Typography>
        <Typography
          variant="body1"
          className="w-2xl text-center"
          sx={{marginTop: '1rem', marginBottom: '2rem'}}
        >
          Join 50,000+ travelers planning smarter, faster, and more affordably
          with WanderPlan.
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}
        >
          <Button
            variant="text"
            size="large"
            sx={{
              backgroundColor: 'primary.contrastText',
              color: 'text.primary',
              marginRight: '0.8rem',
            }}
          >
            Get Started for Free
          </Button>
          <Button
            variant="text"
            size="large"
            sx={{
              backgroundColor: 'primary.contrastText',
              color: 'text.primary',
            }}
          >
            View Premium Plans
          </Button>
        </Box>
        <Typography variant="body2" className="w-2xl text-center">
          No credit card required for basic plan. Cancel anytime.
        </Typography>
      </Box>
    </Container>
  )
}
