import { Box, Container, Typography } from '@mui/material'

export default function RatesSection() {
  return (
    <Container fixed maxWidth="xl" className="my-30">
      <Box
        className="w-full max-w-7xl"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span className="flex flex-col">
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}
          >
            500k+
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Trips Planned
          </Typography>
        </span>
        <span className="flex flex-col">
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}
          >
            120+
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Countries Covered
          </Typography>
        </span>
        <span className="flex flex-col">
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}
          >
            4.9/5
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            App Store Rating
          </Typography>
        </span>
        <span className="flex flex-col">
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}
          >
            AI v4.0
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Latest Engine
          </Typography>
        </span>
      </Box>
    </Container>
  )
}
