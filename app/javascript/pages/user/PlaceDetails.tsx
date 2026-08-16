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
          ({location_details.traveler_ratings.overall?.count} reviews)
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
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Special Notes
                </Typography>
                <Typography variant="body2">
                  {suggestion.specialNotes}
                </Typography>
              </CardContent>
            </Card>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                <InfoOutlinedIcon sx={{ mr: 1 }} />
                Pro Planning Tip
              </Typography>
              <Typography variant="body2">{suggestion.tips}</Typography>
            </Paper>
          </Box>
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
