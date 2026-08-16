import UserLayout from '@/components/shared/UserLayout'
import { Suggestion } from '@/types/suggestion'
import { TripadvisorData } from '@/types/tripadvisor-data'
import { menuItems } from '@/utils/user-navigation-items'
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import { ReactElement, useRef } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ReviewsSection from '@/components/placeDetails/ReviewsSection'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import PlaceMap from '@/components/placeDetails/PlaceMap'
import PlaceGallery from '@/components/placeDetails/PlaceGallery'

function PlaceDetails({
  suggestion,
  enrichedData,
}: {
  suggestion: Suggestion
  enrichedData: TripadvisorData
}) {
  const { location_details, location_photos, location_reviews } = enrichedData
  const reviewsSectionRef = useRef<HTMLDivElement>(null)

  const scrollToReviews = () => {
    reviewsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        {location_details.names[0].value}, {location_details.geo}
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Typography variant="body2">
          {' '}
          <LocationOnOutlinedIcon />
          {suggestion.city}, {suggestion.country}
        </Typography>
        <Rating
          name="read-only"
          value={location_details.traveler_ratings.overall?.rating}
          readOnly
          size="small"
        />
        <Typography
          variant="body2"
          component="button"
          onClick={scrollToReviews}
          sx={{
            p: 0,
            border: 0,
            color: 'primary.main',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            font: 'inherit',
          }}
        >
          ({location_details.traveler_ratings.overall?.count.toLocaleString()}{' '}
          reviews)
        </Typography>
      </Stack>
      <Alert severity="info" sx={{ my: 3 }}>
        <AlertTitle>TripAdvisor Partner Data</AlertTitle>
        Ratings, reviews, and address information shown below are sample
        placeholders synchronized from TripAdvisor API.
      </Alert>
      <Grid container spacing={4}>
        <Grid size={8}>
          <Box>
            <PlaceGallery locationPhotos={location_photos} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              About this place
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {location_details.descriptions[0]?.value ??
                suggestion.description}
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Location
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {location_details.addresses[0]?.formatted}
              </Typography>
              <PlaceMap
                latitude={location_details.coordinates.latitude}
                longitude={location_details.coordinates.longitude}
              />
            </Box>
            <div ref={reviewsSectionRef} id="reviews">
              <ReviewsSection
                travelerRatings={location_details.traveler_ratings}
                locationReviews={location_reviews}
                tripadvisorUrls={location_details.urls}
              />
            </div>
          </Box>
        </Grid>
        <Grid size={4}>
          <Stack spacing={2.5}>
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
                    ? '0 16px 42px rgba(0, 0, 0, 0.24)'
                    : '0 16px 42px rgba(14, 165, 164, 0.1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: 5,
                  background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              })}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: 'center' }}
                  >
                    <Box
                      sx={(theme) => ({
                        display: 'grid',
                        placeItems: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        color: 'primary.contrastText',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: `0 10px 24px ${theme.palette.primary.main}33`,
                      })}
                    >
                      <AutoAwesomeOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: 'primary.main', fontWeight: 800 }}
                      >
                        Trip insight
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, lineHeight: 1.15 }}
                      >
                        Special Notes
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {suggestion.specialNotes}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Paper
              elevation={0}
              sx={(theme) => ({
                p: 3,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                background:
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
                    : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 16px 42px rgba(0, 0, 0, 0.2)'
                    : '0 16px 42px rgba(37, 99, 235, 0.1)',
              })}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: 'center' }}
                >
                  <Box
                    sx={(theme) => ({
                      display: 'grid',
                      placeItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      color: 'secondary.contrastText',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      boxShadow: `0 10px 24px ${theme.palette.secondary.main}30`,
                    })}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'secondary.main', fontWeight: 800 }}
                    >
                      AI planning
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, lineHeight: 1.15 }}
                    >
                      Pro Planning Tip
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {suggestion.tips}
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

PlaceDetails.layout = (
  page: ReactElement<{ suggestion: Suggestion; enrichedData: TripadvisorData }>,
) => {
  const suggestion = page.props?.suggestion
  const enrichedData = page.props?.enrichedData
  const placeName =
    enrichedData?.location_details.names[0]?.value ||
    suggestion?.name ||
    'Place Details'

  return (
    <UserLayout
      navigationItems={menuItems}
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Discover', href: '/trips/new' },
        ...(suggestion?.city ? [{ label: suggestion.city }] : []),
        { label: placeName },
      ]}
    >
      {page}
    </UserLayout>
  )
}

export default PlaceDetails
