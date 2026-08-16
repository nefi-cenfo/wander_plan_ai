import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import { Link, usePage } from '@inertiajs/react'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'

export default function TripadvisorUnavailable({
  place_name,
}: {
  place_name?: string
}) {
  const { auth } = usePage().props
  const destination = auth.user?.role === 'admin' ? '/admin/dashboard' : '/'
  const destinationLabel = auth.user ? 'Back to dashboard' : 'Back home'

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        overflow: 'hidden',
        bgcolor: 'background.default',
        backgroundImage: (theme) =>
          `radial-gradient(circle at 18% 18%, ${theme.palette.primary.main}1f 0, transparent 30%), radial-gradient(circle at 86% 78%, ${theme.palette.secondary.main}1a 0, transparent 32%)`,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          py: { xs: 3, md: 5 },
        }}
      >
        <Link href="/" style={{ width: 'fit-content', textDecoration: 'none' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            WanderPlan
          </Typography>
        </Link>

        <Stack
          spacing={3}
          sx={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 6,
          }}
        >
          <Typography
            aria-hidden="true"
            sx={{
              position: 'absolute',
              zIndex: 0,
              color: 'transparent',
              WebkitTextStroke: (theme) =>
                `1px ${theme.palette.primary.main}2e`,
              fontSize: { xs: '5.5rem', sm: '8rem', md: '11rem' },
              fontWeight: 900,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            NO DATA
          </Typography>

          <Paper
            elevation={0}
            sx={{
              zIndex: 1,
              width: 'min(100%, 640px)',
              p: { xs: 3, sm: 5 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 5,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(248,250,252,0.9))',
              boxShadow: '0 24px 70px rgba(15, 118, 110, 0.14)',
            }}
          >
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 88,
                  height: 88,
                  borderRadius: '28px',
                  color: 'primary.contrastText',
                  background: 'linear-gradient(135deg, #0EA5A4, #2563EB)',
                  boxShadow: '0 20px 45px rgba(14, 165, 164, 0.35)',
                  transform: 'rotate(-8deg)',
                }}
              >
                <TravelExploreRoundedIcon sx={{ fontSize: 48 }} />
              </Box>

              <Stack spacing={1.5}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '3rem' },
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    color: 'text.primary',
                  }}
                >
                  TripAdvisor data is unavailable
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
                >
                  We could not retrieve TripAdvisor details
                  {place_name ? ` for ${place_name}` : ''} right now. Go back
                  and try another recommendation, or check this place again
                  later.
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  LinkComponent={Link}
                  href={destination}
                  variant="contained"
                  size="large"
                  startIcon={<HomeRoundedIcon />}
                >
                  {destinationLabel}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => window.history.back()}
                >
                  Go back
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          TripAdvisor enrichment unavailable
        </Typography>
      </Container>
    </Box>
  )
}
