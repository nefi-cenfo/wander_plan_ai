import { Trip } from '@/types/trip'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

export default function TripHero({ trip }: { trip: Trip }) {
  const startDate = dayjs(trip.startDate).format('MMM D')
  const endDate = dayjs(trip.endDate).format('MMM D, YYYY')

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 3, md: 5 },
        mb: 4,
        color: 'primary.contrastText',
        background:
          'linear-gradient(135deg, #0EA5A4 0%, #0F766E 48%, #2563EB 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -90,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.14)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: '35%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.09)',
        }}
      />

      <Box sx={{ position: 'relative', maxWidth: 760 }}>
        <Chip
          icon={<ExploreOutlinedIcon />}
          label={`${trip.numberDays} day adventure`}
          sx={{
            mb: 2,
            color: 'primary.contrastText',
            backgroundColor: 'rgba(255,255,255,0.18)',
            '& .MuiChip-icon': { color: 'primary.contrastText' },
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.25rem', md: '3.5rem' },
            fontWeight: 800,
            letterSpacing: '-0.04em',
            mb: 2,
          }}
        >
          My trip to {trip.destination.location}
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: 620, color: 'rgba(255,255,255,0.86)', mb: 3 }}
        >
          Your AI-assisted travel plan with curated places, practical notes,
          and local recommendations for the journey.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <CalendarTodayOutlinedIcon fontSize="small" />
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {startDate} - {endDate}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <LocationOnOutlinedIcon fontSize="small" />
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {trip.destination.latitude.toFixed(4)},{' '}
              {trip.destination.longitude.toFixed(4)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}
