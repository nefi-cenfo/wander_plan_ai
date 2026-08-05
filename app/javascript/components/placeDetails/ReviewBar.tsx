import { TripadvisorRatingBreakdown } from '@/types/tripadvisor-data'
import { Box, LinearProgress, Typography } from '@mui/material'

export default function ReviewBar({
  breakdown,
  calculatePercentage,
}: {
  breakdown: TripadvisorRatingBreakdown
  calculatePercentage: (count: number) => number
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
      <Typography variant="body1">{breakdown.rating}</Typography>
      <LinearProgress
        variant="determinate"
        aria-label="5-stars"
        value={calculatePercentage(breakdown.count)}
        sx={{
          width: '100%',
          height: '8px',
          mx: 2,
          borderRadius: '4px',
        }}
      />
      <Typography variant="body1" sx={{ width: '2.3rem', textAlign: 'right' }}>
        {calculatePercentage(breakdown.count)}%
      </Typography>
    </Box>
  )
}
