import { Box, Button, Stack, Typography } from '@mui/material'
import ReviewsBreakdown from './ReviewsBreakdown'
import {
  TripadvisorReview,
  TripadvisorTravelerRatings,
  TripadvisorUrls,
} from '@/types/tripadvisor-data'
import Review from './Review'

export default function ReviewsSection({
  travelerRatings,
  locationReviews,
  tripadvisorUrls,
}: {
  travelerRatings: TripadvisorTravelerRatings
  locationReviews: TripadvisorReview[]
  tripadvisorUrls: TripadvisorUrls
}) {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          mb: { xs: 3, md: 4 },
        }}
      >
        <Typography
          component="h4"
          variant="h4"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.125rem' },
            fontWeight: 700,
          }}
        >
          What travelers say
        </Typography>
        <Button
          variant="outlined"
          LinkComponent="a"
          size="large"
          href={tripadvisorUrls.tripadvisor.write_review}
          target="blank"
          sx={{ alignSelf: { sm: 'flex-start' } }}
        >
          Write a Review
        </Button>
      </Stack>
      {travelerRatings.breakdowns.length > 0 && (
        <Box sx={{ mb: { xs: 5, md: 9 } }}>
          <ReviewsBreakdown travelerRatings={travelerRatings} />
        </Box>
      )}
      {locationReviews.map((review, index) => (
        <Review key={index} locationReview={review} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {travelerRatings.overall && (
          <Button
            variant="text"
            LinkComponent="a"
            size="large"
            href={tripadvisorUrls.tripadvisor.main}
            target="blank"
            sx={{ textAlign: 'center' }}
          >
            Show all {travelerRatings.overall.count} reviews on TripAdvisor
          </Button>
        )}
      </Box>
    </>
  )
}
