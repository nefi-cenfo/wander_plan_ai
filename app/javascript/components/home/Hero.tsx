import { Box, Button, Container, Paper, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import heroImg from '/assets/hero.png'

export default function Hero() {
  return (
    <Container fixed maxWidth="xl">
      <div className="flex flex-col items-center">
        <Box className="w-2xl mt-30 mb-20">
          <h2>
            <Typography
              variant="h2"
              component="div"
              sx={{
                color: 'text.primary',
                fontSize: '5rem',
                fontWeight: 'bold',
              }}
            >
              Your AI-Powered
            </Typography>
            <Typography
              variant="h2"
              component="div"
              sx={{
                color: 'primary.main',
                fontSize: '5rem',
                fontWeight: 'bold',
              }}
            >
              Travel Architect
            </Typography>
          </h2>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '3rem',
            }}
          >
            WanderPlan crafts personalized itineraries in seconds. From
            budget-friendly backpacking to luxury escapes, our AI handles the
            logistics so you can focus on the journey.
          </Typography>
          <span className="flex justify-center">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ marginRight: '0.8rem' }}
            >
              Start Planning for Free
            </Button>
            <Button variant="outlined" size="large">
              Explore Destinations
            </Button>
          </span>
        </Box>
        <Paper square={false} elevation={24} className="mb-30">
          <img alt="hero" src={heroImg} />
        </Paper>
      </div>
    </Container>
  )
}
