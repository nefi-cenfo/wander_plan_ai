import { TripadvisorTravelerRatings } from '@/types/tripadvisor-data'
import { Box, Card, CardContent, Grid, Rating, Typography } from '@mui/material'
import ReviewBar from './ReviewBar'

export default function ReviewsBreakdown({
  travelerRatings,
}: {
  travelerRatings: TripadvisorTravelerRatings
}) {
  const { overall, breakdowns } = travelerRatings

  function calculatePercentage(count: number): number {
    const countTotal = overall.count
    return Math.round((count / countTotal) * 100)
  }
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid size={6}>
            <Box>
              <Typography variant="body1">
                <Typography
                  variant="h3"
                  component="span"
                  sx={{ fontWeight: 700 }}
                >
                  {overall.rating}
                </Typography>
                <Typography component="span"> / 5.0</Typography>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Based on {overall.count} verified reviews
              </Typography>
              <Rating name="read-only" value={overall.rating} readOnly />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
              {breakdowns.map((breakdown, key) => (
                <ReviewBar
                  key={key}
                  breakdown={breakdown}
                  calculatePercentage={calculatePercentage}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
