import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/user-navigation-items'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import { router, usePage } from '@inertiajs/react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ReactNode, useState } from 'react'

const basicFeatures = [
  'Create up to 3 trips',
  'AI-powered recommendations',
  'Discover places for each destination',
]

const premiumFeatures = [
  'Unlimited trips',
  'Create itineraries with AI',
  'Pocket Mode PDF downloads',
]

function Billing() {
  const { auth } = usePage().props
  const subscription = auth.user?.subscription
  const [processingCheckout, setProcessingCheckout] = useState(false)
  const [processingPortal, setProcessingPortal] = useState(false)
  const isPremium = subscription?.premium ?? false
  const currentPlanName = subscription?.plan_name ?? 'Basic'
  const statusLabel = subscription?.status
    ? subscription.status.replace(/_/g, ' ')
    : 'Active'
  const billingDate = subscription?.ends_at ?? subscription?.trial_ends_at
  const billingDateLabel = billingDate
    ? new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
      }).format(new Date(billingDate))
    : null

  const startCheckout = () => {
    setProcessingCheckout(true)

    router.post('/checkout', undefined, {
      onFinish: () => setProcessingCheckout(false),
    })
  }

  const openCustomerPortal = () => {
    setProcessingPortal(true)

    router.post('/checkout/portal', undefined, {
      onFinish: () => setProcessingPortal(false),
    })
  }

  const handlePremiumAction = () => {
    if (isPremium) {
      openCustomerPortal()
      return
    }

    startCheckout()
  }

  const renderFeatures = (features: string[]) => (
    <Stack spacing={1.5}>
      {features.map((feature) => (
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: 'center' }}
          key={feature}
        >
          <CheckCircleOutlineRoundedIcon color="success" fontSize="small" />
          <Typography variant="body2">{feature}</Typography>
        </Stack>
      ))}
    </Stack>
  )

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{ fontSize: '2rem', fontWeight: 900, mb: 1 }}
        >
          Billing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose the plan that fits your travel planning style.
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          mb: 3,
          border: '1px solid',
          borderColor: isPremium ? 'primary.main' : 'divider',
          background: isPremium
            ? 'linear-gradient(135deg, rgba(14, 165, 164, 0.1), rgba(37, 99, 235, 0.08))'
            : 'background.paper',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Box>
              <Typography variant="overline" color="text.secondary">
                Current subscription
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {currentPlanName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isPremium
                  ? 'Your premium travel planning features are active.'
                  : 'You are using the free plan included with your account.'}
              </Typography>
            </Box>

            <Stack spacing={1} sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
              <Chip
                label={statusLabel}
                color={isPremium ? 'primary' : 'default'}
                sx={{ textTransform: 'capitalize', fontWeight: 800 }}
              />
              {billingDateLabel && (
                <Typography variant="body2" color="text.secondary">
                  {subscription?.ends_at ? 'Renews or ends' : 'Trial ends'} on{' '}
                  {billingDateLabel}
                </Typography>
              )}
              {isPremium && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CreditCardRoundedIcon />}
                  disabled={processingPortal}
                  onClick={openCustomerPortal}
                >
                  {processingPortal ? 'Opening portal...' : 'Manage subscription'}
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>
                      Basic
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Included when you create an account.
                    </Typography>
                  </Box>
                  <Chip label="Default" />
                </Stack>

                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 900 }}>
                    $0
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      /month
                    </Typography>
                  </Typography>
                </Box>

                <Divider />
                {renderFeatures(basicFeatures)}

                <Button variant="outlined" disabled fullWidth size="large">
                  {isPremium ? 'Included in Premium' : 'Current plan'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: '0 24px 55px rgba(15, 118, 110, 0.16)',
            }}
          >
            <Box
              sx={{
                height: 8,
                background: 'linear-gradient(90deg, #0EA5A4 0%, #2563EB 100%)',
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>
                      Premium
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unlock the complete travel planning toolkit.
                    </Typography>
                  </Box>
                  <Chip
                    icon={<WorkspacePremiumRoundedIcon />}
                    label="Best value"
                    sx={{
                      color: 'primary.dark',
                      fontWeight: 800,
                      backgroundColor: 'rgba(14, 165, 164, 0.1)',
                      '& .MuiChip-icon': { color: 'primary.main' },
                    }}
                  />
                </Stack>

                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 900 }}>
                    $12
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      /month
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Billed monthly. Cancel anytime.
                  </Typography>
                </Box>

                <Divider />
                {renderFeatures(premiumFeatures)}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<CreditCardRoundedIcon />}
                  disabled={processingCheckout || processingPortal}
                  onClick={handlePremiumAction}
                  sx={{ justifyContent: 'space-between' }}
                >
                  {isPremium
                    ? processingPortal
                      ? 'Opening portal...'
                      : 'Manage subscription'
                    : processingCheckout
                      ? 'Opening Stripe...'
                      : 'Upgrade with Stripe'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

Billing.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default Billing
