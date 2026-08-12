import { Box, Button, Typography } from '@mui/material'
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
      <Typography
        component="h4"
        sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}
      >
        <Typography
          component="span"
          variant="h4"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          What travelers say
        </Typography>
        <Button
          variant="outlined"
          LinkComponent="a"
          size="large"
          href={tripadvisorUrls.tripadvisor.write_review}
          target="blank"
        >
          Write a Review
        </Button>
      </Typography>
      <Box sx={{ mb: 9 }}>
        <ReviewsBreakdown travelerRatings={travelerRatings} />
      </Box>
      {locationReviews.map((review, index) => (
        <Review key={index} locationReview={review} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="text"
          LinkComponent="a"
          size="large"
          href={tripadvisorUrls.tripadvisor.main}
          target="blank"
        >
          Show all {travelerRatings.overall.count} reviews on TripAdvisor
        </Button>
      </Box>
    </>
  )
}
