import RecommendationsForm from '@/components/discover/RecommendationsForm'
import SuggestionList from '@/components/discover/SuggestionList'
import UserLayout from '@/components/shared/UserLayout'
import { Suggestion } from '@/types/suggestion'
import { menuItems } from '@/utils/user-navigation-items'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import travelPlaceholderImg from '@/assets/undraw_travel-destination_d2a9.svg'
import { Destination } from '@/types/destination'
import FlashSnackbar from '@/components/shared/FlashSnackbar'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Link, usePage } from '@inertiajs/react'

function Discover({
  suggestion_list,
  destination,
  active_trips_count,
  active_trips_limit,
}: {
  suggestion_list: Suggestion[]
  destination: Destination
  active_trips_count: number
  active_trips_limit: number
}) {
  const { auth } = usePage().props
  const [suggestionList, setSuggestionList] = useState<Suggestion[] | null>(
    null,
  )
  const isPremium = auth.user?.subscription.premium ?? false
  const hasReachedBasicLimit = active_trips_count >= active_trips_limit
  const params = new URLSearchParams(window.location.search)
  const tripId = Number(params.get('created_trip_id'))

  useEffect(() => {
    setSuggestionList(suggestion_list?.length ? suggestion_list : null)
  }, [suggestion_list])
  return (
    <>
      <FlashSnackbar />
      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        Create Your Trip
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Turn your next destination into a curated travel plan with AI-powered
        recommendations.
      </Typography>
      {!isPremium && (
        <Alert
          severity={hasReachedBasicLimit ? 'info' : 'success'}
          icon={false}
          sx={{
            mb: 3,
            border: '1px solid',
            borderColor: hasReachedBasicLimit ? 'primary.main' : 'divider',
            color: 'text.primary',
            background: hasReachedBasicLimit
              ? 'linear-gradient(135deg, rgba(14, 165, 164, 0.12), rgba(37, 99, 235, 0.08))'
              : 'rgba(14, 165, 164, 0.08)',
            '& .MuiAlert-message': { width: '100%' },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Box>
              <AlertTitle sx={{ fontWeight: 900, color: 'text.primary' }}>
                Basic plan trip usage
              </AlertTitle>
              <Typography variant="body2" color="text.secondary">
                You have used {active_trips_count} of {active_trips_limit}{' '}
                active trips. Current and upcoming trips count toward your Basic
                plan limit.
              </Typography>
            </Box>
            {hasReachedBasicLimit && (
              <Button
                variant="contained"
                size="small"
                LinkComponent={Link}
                href="/checkout"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Upgrade to Premium
              </Button>
            )}
          </Stack>
        </Alert>
      )}
      <Box sx={{ marginBottom: 3 }}>
        <RecommendationsForm />
      </Box>
      {suggestionList?.length && (
        <SuggestionList
          suggestions={suggestionList}
          destination={destination}
          tripId={tripId}
        />
      )}
      {!suggestionList && (
        <Box>
          <Card
            elevation={0}
            sx={(theme) => ({
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              background:
                theme.palette.mode === 'dark'
                  ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
                  : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 18px 50px rgba(0, 0, 0, 0.24)'
                  : '0 18px 50px rgba(14, 165, 164, 0.1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -120,
                right: -90,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: `${theme.palette.primary.main}1F`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -130,
                left: -90,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: `${theme.palette.secondary.main}1A`,
              },
            })}
          >
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                minHeight: { xs: 420, md: 560 },
                p: { xs: 3, sm: 4, md: 6 },
                '&:last-child': { pb: { xs: 3, sm: 4, md: 6 } },
              }}
            >
              <Stack
                spacing={3}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Box
                  sx={(theme) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.75,
                    py: 0.75,
                    borderRadius: 999,
                    color: 'primary.main',
                    backgroundColor: `${theme.palette.primary.main}14`,
                    border: `1px solid ${theme.palette.primary.main}2E`,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                  })}
                >
                  <AutoAwesomeIcon sx={{ fontSize: '1rem' }} />
                  Ready when you are
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      position: 'absolute',
                      width: { xs: 210, md: 280 },
                      height: { xs: 210, md: 280 },
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${theme.palette.primary.main}26, ${theme.palette.secondary.main}12 55%, transparent 70%)`,
                    })}
                  />
                  <Box
                    component="img"
                    src={travelPlaceholderImg}
                    alt="Travel destination illustration"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: { xs: 260, md: 360 },
                    }}
                  />
                </Box>

                <Box sx={{ maxWidth: 560, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    No trip ideas yet
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    Choose a destination and dates above, then let WanderPlan
                    generate your first itinerary ideas.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  )
}

Discover.layout = (page: ReactNode) => (
  <UserLayout
    navigationItems={menuItems}
    breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Discover' }]}
  >
    {page}
  </UserLayout>
)

export default Discover
