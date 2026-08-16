import SuggestionList from '@/components/discover/SuggestionList'
import UserLayout from '@/components/shared/UserLayout'
import TripHero from '@/components/trips/TripHero'
import TripStats from '@/components/trips/TripStats'
import { Trip } from '@/types/trip'
import { menuItems } from '@/utils/user-navigation-items'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ReactElement } from 'react'
import ItineraryCTACard from '../../components/itinerary/ItineraryCTACard'
import { usePage } from '@inertiajs/react'

function TripDetails({ trip }: { trip: Trip }) {
  const { auth } = usePage().props
  const subscription = auth.user?.subscription
  const suggestions = trip.itinerary?.suggestions || []

  return (
    <>
      <TripHero trip={trip} />
      <TripStats trip={trip} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {suggestions.length ? (
            <SuggestionList
              suggestions={suggestions}
              destination={trip.destination}
            />
          ) : (
            <Alert severity="info">
              No AI suggestions are available for this trip yet.
            </Alert>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            <ItineraryCTACard
              trip={trip}
              isPremium={subscription?.premium ?? false}
            />

            <Card
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: 'center' }}
                >
                  <MapOutlinedIcon color="primary" />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Destination Snapshot
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Your trip centers around this destination and uses its
                  coordinates to enrich place recommendations.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {trip.destination.location}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Latitude
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {trip.destination.latitude.toFixed(6)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Longitude
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {trip.destination.longitude.toFixed(6)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                background:
                  'linear-gradient(180deg, rgba(14,165,164,0.08), rgba(37,99,235,0.06))',
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: 'center' }}
                >
                  <InfoOutlinedIcon color="primary" />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Planning Guide
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5}>
                    <ExploreOutlinedIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Open each suggested place to review richer TripAdvisor
                      details, photos, reviews, and map information.
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <ExploreOutlinedIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Use the date range and duration as your planning baseline
                      when organizing daily activities.
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

TripDetails.layout = (page: ReactElement<{ trip: Trip }>) => {
  const trip = page.props?.trip

  return (
    <UserLayout
      navigationItems={menuItems}
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'My Trips', href: '/trips' },
        { label: trip?.destination.location || 'Trip Details' },
      ]}
    >
      {page}
    </UserLayout>
  )
}

export default TripDetails
