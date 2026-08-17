import type { User } from '@/types'
import { router } from '@inertiajs/react'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useState } from 'react'

const styles: Record<string, SxProps<Theme>> = {
  card: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 4,
    boxShadow: '0 24px 60px rgba(15, 118, 110, 0.1)',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    p: { xs: 2.5, md: 3 },
    position: 'relative',
    zIndex: 1,
  },
  titleRow: {
    alignItems: { xs: 'flex-start', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 1,
  },
  meta: {
    alignItems: { xs: 'flex-start', md: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1.5, sm: 2.5 },
  },
}

function formatDate(date?: string) {
  if (!date) return null

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(date))
}

export default function UserGreetingWidget({ user }: { user: User | null }) {
  const theme = useTheme()
  const [processing, setProcessing] = useState(false)
  const subscription = user?.subscription
  const isPremium = subscription?.premium ?? false
  const planName = subscription?.plan_name ?? 'Basic'
  const firstName = user?.name || 'Traveler'
  const billingDate = subscription?.ends_at ?? subscription?.trial_ends_at
  const billingDateLabel = formatDate(billingDate)

  const handleAction = () => {
    setProcessing(true)

    router.post(isPremium ? '/checkout/portal' : '/checkout', undefined, {
      onFinish: () => setProcessing(false),
    })
  }

  return (
    <Card
      elevation={0}
      sx={{
        ...styles.card,
        background: isPremium
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.16)} 0%, ${alpha(theme.palette.secondary.main, 0.12)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.07)} 100%)`,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          bottom: -28,
          color: alpha(theme.palette.primary.main, 0.1),
          position: 'absolute',
          right: { xs: -8, sm: 22 },
          transform: 'rotate(-8deg)',
          '& svg': { fontSize: { xs: 110, sm: 145 } },
        }}
      >
        {isPremium ? <WorkspacePremiumRoundedIcon /> : <ExploreRoundedIcon />}
      </Box>

      <CardContent sx={styles.content}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 4 }}
          sx={{ justifyContent: 'space-between' }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Stack sx={styles.titleRow}>
              <Typography
                variant="h3"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '1.7rem', sm: '2rem' },
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.05,
                }}
              >
                Welcome back, {firstName}!
              </Typography>
              <Chip
                icon={isPremium ? <WorkspacePremiumRoundedIcon /> : undefined}
                label={`${planName} Plan`}
                size="small"
                sx={{
                  bgcolor: alpha(
                    theme.palette.primary.main,
                    isPremium ? 0.14 : 0.1,
                  ),
                  color: 'primary.dark',
                  fontWeight: 900,
                  '& .MuiChip-icon': { color: 'primary.main' },
                }}
              />
            </Stack>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.98rem', sm: '1.05rem' },
                lineHeight: 1.55,
                mt: 1.5,
              }}
            >
              {isPremium
                ? 'Your premium travel toolkit is active. Keep building AI itineraries, unlimited trips, and Pocket Mode plans for every journey.'
                : 'You are currently on the free tier. Unlock unlimited AI itineraries and offline Pocket Mode today.'}
            </Typography>
          </Box>

          <Stack sx={{ alignItems: { xs: 'stretch', md: 'flex-end' }, gap: 2 }}>
            <Stack sx={styles.meta}>
              {billingDateLabel && (
                <Box
                  sx={{ minWidth: 90, textAlign: { xs: 'left', sm: 'right' } }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                    }}
                  >
                    {subscription?.ends_at ? 'Next renewal' : 'Trial ends'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>
                    {billingDateLabel}
                  </Typography>
                </Box>
              )}

              <Button
                variant="contained"
                startIcon={
                  isPremium ? (
                    <CreditCardRoundedIcon />
                  ) : (
                    <AutoAwesomeRoundedIcon />
                  )
                }
                disabled={processing}
                onClick={handleAction}
                sx={{
                  borderRadius: 2,
                  boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, 0.28)}`,
                  minWidth: { xs: '100%', sm: 190 },
                  px: 2.25,
                  py: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                {processing
                  ? isPremium
                    ? 'Opening portal...'
                    : 'Opening Stripe...'
                  : isPremium
                    ? 'Manage subscription'
                    : 'Upgrade to Premium'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
