import { TripadvisorReview } from '@/types/tripadvisor-data'
import { Avatar, Box, Divider, Rating, Stack, Typography } from '@mui/material'

const formatRelativeTime = (timestamp: string) => {
  const publishedAt = new Date(timestamp).getTime()
  const elapsedMs = Date.now() - publishedAt

  if (Number.isNaN(publishedAt) || elapsedMs < 0) {
    return timestamp
  }

  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24))
  const units = [
    { label: 'year', value: Math.floor(elapsedDays / 365) },
    { label: 'month', value: Math.floor(elapsedDays / 30) },
    { label: 'week', value: Math.floor(elapsedDays / 7) },
    { label: 'day', value: elapsedDays },
  ]

  const unit = units.find(({ value }) => value > 0)

  if (!unit) {
    return 'today'
  }

  return `${unit.value} ${unit.label}${unit.value === 1 ? '' : 's'} ago`
}

export default function Review({
  locationReview,
}: {
  locationReview: TripadvisorReview
}) {
  const { user, text, title, publish_ts, rating } = locationReview
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', minWidth: 0 }}>
          <Avatar
            alt={user.username}
            src={user.avatar_url.url}
            sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 } }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 2,
              minWidth: 0,
            }}
          >
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}
            >
              {user.username}
            </Typography>
            <Typography variant="body2">
              {formatRelativeTime(publish_ts)}
            </Typography>
          </Box>
        </Box>
        <Rating name="read-only" value={rating} readOnly size="small" />
      </Stack>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title[0].value}
      </Typography>
      <Typography variant="body1" sx={{ overflowWrap: 'anywhere' }}>
        {text[0].value}
      </Typography>
      <Divider sx={{ my: { xs: 3, md: 5 } }} />
    </Box>
  )
}
