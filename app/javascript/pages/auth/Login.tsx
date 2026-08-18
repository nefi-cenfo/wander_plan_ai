import appLogo from '@/assets/app_logo.png'
import LoginForm from '@/components/auth/LoginForm'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Link } from '@inertiajs/react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
        background: (theme) =>
          `radial-gradient(circle at top left, ${theme.palette.primary.main}33, transparent 34%), radial-gradient(circle at bottom right, ${theme.palette.secondary.main}2E, transparent 36%), ${theme.palette.background.default}`,
      }}
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          width: '100%',
          maxWidth: 960,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' },
          overflow: 'hidden',
          borderRadius: { xs: 4, md: 5 },
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 28px 80px rgba(0, 0, 0, 0.42)'
              : '0 28px 80px rgba(15, 118, 110, 0.16)',
        })}
      >
        <Box
          sx={(theme) => ({
            position: 'relative',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 620,
            p: 5,
            color: 'primary.contrastText',
            background: `linear-gradient(145deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 48%, ${theme.palette.secondary.main})`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 'auto -25% -18% 8%',
              height: 280,
              borderRadius: '50%',
              border: '36px solid rgba(255, 255, 255, 0.16)',
              transform: 'rotate(-12deg)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 72,
              right: -70,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
            },
          })}
        >
          <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              component="img"
              src={appLogo}
              alt="WanderPlan logo"
              sx={{
                width: 132,
                height: 132,
                objectFit: 'contain',
                filter: 'drop-shadow(0 18px 30px rgba(0, 0, 0, 0.28))',
              }}
            />
            <Box>
              <Typography variant="h3" component="p" sx={{ fontWeight: 800 }}>
                Plan smarter trips with AI.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  maxWidth: 320,
                  color: 'rgba(255, 255, 255, 0.78)',
                }}
              >
                Pick up where you left off and turn ideas into polished travel
                plans.
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="overline"
            sx={{
              position: 'relative',
              zIndex: 1,
              letterSpacing: 2,
              opacity: 0.78,
            }}
          >
            WanderPlan AI
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Button
            LinkComponent={Link}
            href="/"
            startIcon={<ArrowBackRoundedIcon />}
            variant="text"
            sx={{
              alignSelf: 'flex-start',
              color: 'text.secondary',
              fontWeight: 800,
              mb: 3,
              px: 0,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'transparent',
                color: 'primary.main',
              },
            }}
          >
            Back to landing page
          </Button>
          <Box
            component="img"
            src={appLogo}
            alt="WanderPlan logo"
            sx={{
              display: { xs: 'block', md: 'none' },
              width: 96,
              height: 96,
              objectFit: 'contain',
              mx: 'auto',
              mb: 2,
            }}
          />
          <LoginForm />
        </Box>
      </Paper>
    </Box>
  )
}
