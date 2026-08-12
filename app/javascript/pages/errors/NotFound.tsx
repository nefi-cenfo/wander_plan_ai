import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { Link, usePage } from '@inertiajs/react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

export default function NotFound() {
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
          `radial-gradient(circle at 20% 15%, ${theme.palette.primary.main}18 0, transparent 28%), radial-gradient(circle at 85% 80%, ${theme.palette.secondary.main}14 0, transparent 30%)`,
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
              fontSize: { xs: '10rem', sm: '16rem', md: '22rem' },
              fontWeight: 900,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            404
          </Typography>

          <Box
            sx={{
              zIndex: 1,
              display: 'grid',
              placeItems: 'center',
              width: 88,
              height: 88,
              borderRadius: '50%',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
              boxShadow: (theme) =>
                `0 20px 45px ${theme.palette.primary.main}4d`,
              transform: 'rotate(-12deg)',
            }}
          >
            <ExploreRoundedIcon sx={{ fontSize: 48 }} />
          </Box>

          <Stack spacing={1.5} sx={{ zIndex: 1, maxWidth: 560 }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.05em',
                color: 'text.primary',
              }}
            >
              This route is off the map
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              The page may have moved, or the destination does not exist.
              Let&apos;s get you back to familiar ground.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ zIndex: 1, width: { xs: '100%', sm: 'auto' } }}
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

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          Error 404 · Destination not found
        </Typography>
      </Container>
    </Box>
  )
}
