import ReviewBar from './ReviewBar'
import { TripadvisorTravelerRatings } from '@/types/tripadvisor-data'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material'

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
    <Card
      elevation={0}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
            : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 18px 50px rgba(0, 0, 0, 0.28)'
            : '0 18px 50px rgba(14, 165, 164, 0.12)',
      })}
    >
      <CardContent
        sx={{ p: { xs: 3, md: 4 }, '&:last-child': { pb: { xs: 3, md: 4 } } }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          sx={{ alignItems: 'center' }}
        >
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    letterSpacing: 1.4,
                  }}
                >
                  Traveler rating
                </Typography>
                <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
                  What visitors think
                </Typography>
              </Box>

              <Box
                sx={(theme) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  width: 'fit-content',
                  px: 2.5,
                  py: 2,
                  borderRadius: 3,
                  color: 'primary.contrastText',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 14px 34px ${theme.palette.primary.main}33`,
                })}
              >
                <Typography
                  variant="h2"
                  component="span"
                  sx={{ fontWeight: 900, lineHeight: 1 }}
                >
                  {overall.rating}
                </Typography>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    out of 5.0
                  </Typography>
                  <Rating
                    name="overall-traveler-rating"
                    value={overall.rating}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{ color: 'warning.main', mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary">
                Based on {overall.count.toLocaleString()} verified reviews from
                travelers.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack
              spacing={1.5}
              sx={(theme) => ({
                p: { xs: 2, sm: 2.5 },
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: 'background.paper',
              })}
            >
              {[...breakdowns].reverse().map((breakdown) => (
                <ReviewBar
                  key={breakdown.rating}
                  breakdown={breakdown}
                  calculatePercentage={calculatePercentage}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
