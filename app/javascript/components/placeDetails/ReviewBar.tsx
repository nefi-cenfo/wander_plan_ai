import { TripadvisorRatingBreakdown } from '@/types/tripadvisor-data'
import { Box, LinearProgress, Typography } from '@mui/material'

export default function ReviewBar({
  breakdown,
  calculatePercentage,
}: {
  breakdown: TripadvisorRatingBreakdown
  calculatePercentage: (count: number) => number
}) {
  const percentage = calculatePercentage(breakdown.count)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '4.25rem 1fr 3.25rem',
          sm: '5.25rem 1fr 3.75rem',
        },
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontWeight: 700 }}
      >
        {breakdown.rating} stars
      </Typography>
      <LinearProgress
        variant="determinate"
        aria-label={`${breakdown.rating} star reviews`}
        value={percentage}
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 999,
          backgroundColor: 'divider',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      />
      <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 800 }}>
        {percentage}%
      </Typography>
    </Box>
  )
}
