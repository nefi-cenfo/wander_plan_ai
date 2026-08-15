import appLogo from '@/assets/app_logo.png'
import SignUpForm from '@/components/auth/SignUpForm'
import { Box, Paper, Stack, Typography } from '@mui/material'

export default function SignUp() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
        background: (theme) =>
          `radial-gradient(circle at top right, ${theme.palette.secondary.main}30, transparent 34%), radial-gradient(circle at bottom left, ${theme.palette.primary.main}33, transparent 38%), ${theme.palette.background.default}`,
      }}
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          width: '100%',
          maxWidth: 1040,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          overflow: 'hidden',
          borderRadius: { xs: 4, md: 5 },
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 28px 80px rgba(0, 0, 0, 0.42)'
              : '0 28px 80px rgba(37, 99, 235, 0.14)',
        })}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={appLogo}
            alt="WanderPlan logo"
            sx={{
              display: { xs: 'block', md: 'none' },
              width: 88,
              height: 88,
              objectFit: 'contain',
              mx: 'auto',
              mb: 2,
            }}
          />
          <SignUpForm />
        </Box>

        <Box
          sx={(theme) => ({
            position: 'relative',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 720,
            p: 5,
            color: 'primary.contrastText',
            background: `linear-gradient(150deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark})`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -90,
              left: -80,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.14)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -160,
              bottom: 80,
              width: 420,
              height: 180,
              borderRadius: '999px',
              border: '34px solid rgba(255, 255, 255, 0.15)',
              transform: 'rotate(-18deg)',
            },
          })}
        >
          <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              component="img"
              src={appLogo}
              alt="WanderPlan logo"
              sx={{
                width: 124,
                height: 124,
                objectFit: 'contain',
                filter: 'drop-shadow(0 18px 30px rgba(0, 0, 0, 0.28))',
              }}
            />
            <Box>
              <Typography variant="h3" component="p" sx={{ fontWeight: 800 }}>
                Start building your travel workspace.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, maxWidth: 330, color: 'rgba(255, 255, 255, 0.78)' }}
              >
                Save ideas, discover places, and generate itinerary drafts from
                one WanderPlan account.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ position: 'relative', zIndex: 1 }}>
            {['Discover', 'Plan', 'Go'].map((step) => (
              <Box
                key={step}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {step}
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}
