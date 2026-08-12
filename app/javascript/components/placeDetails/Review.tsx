import { TripadvisorReview } from '@/types/tripadvisor-data'
import { Avatar, Box, Divider, Rating, Typography } from '@mui/material'

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
      <Typography
        variant="h5"
        sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
      >
        <Box sx={{ display: 'flex' }}>
          <Avatar
            alt={user.username}
            src={user.avatar_url.url}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
            <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
              {user.username}
            </Typography>
            <Typography variant="body2">
              {formatRelativeTime(publish_ts)}
            </Typography>
          </Box>
        </Box>
        <Rating name="read-only" value={rating} readOnly />
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title[0].value}
      </Typography>
      <Typography variant="body1">{text[0].value}</Typography>
      <Divider sx={{ my: 5 }} />
    </Box>
  )
}
