import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/user-navigation-items'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import { router } from '@inertiajs/react'
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
  const [processingCheckout, setProcessingCheckout] = useState(false)

  const startCheckout = () => {
    setProcessingCheckout(true)

    router.post('/checkout', undefined, {
      onFinish: () => setProcessingCheckout(false),
    })
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
                  Current default plan
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
                  disabled={processingCheckout}
                  onClick={startCheckout}
                  sx={{ justifyContent: 'space-between' }}
                >
                  {processingCheckout
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
