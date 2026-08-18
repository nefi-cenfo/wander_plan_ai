import type { Trip } from '@/types/trip'
import { Link } from '@inertiajs/react'
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

const styles: Record<string, SxProps<Theme>> = {
  card: {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 4,
    boxShadow: '0 20px 50px rgba(37, 99, 235, 0.08)',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    height: '100%',
    p: { xs: 2.5, md: 3 },
  },
}

function toLocalDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

function daysBetween(startDate: Date, endDate: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return Math.max(
    0,
    Math.ceil((endDate.getTime() - startDate.getTime()) / millisecondsPerDay),
  )
}

function formatDateRange(trip: Trip) {
  const startDate = toLocalDate(trip.startDate)
  const endDate = toLocalDate(trip.endDate)
  const start = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(startDate)
  const end = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(endDate)

  return `${start} - ${end}`
}

export default function UpcomingTripWidget({ trip }: { trip: Trip | null }) {
  const theme = useTheme()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isCurrentTrip = trip
    ? toLocalDate(trip.startDate) <= today && toLocalDate(trip.endDate) >= today
    : false
  const daysUntilTrip = trip
    ? daysBetween(today, toLocalDate(trip.startDate))
    : 0
  const destination = trip?.destination.location ?? 'your next destination'

  return (
    <Card elevation={0} sx={styles.card}>
      <Box
        aria-hidden="true"
        sx={{
          bgcolor: 'primary.main',
          bottom: 0,
          left: 0,
          position: 'absolute',
          top: 0,
          width: 5,
        }}
      />

      <CardContent sx={styles.content}>
        <Stack
          spacing={1.75}
          sx={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            minHeight: { xs: 240, md: 220 },
            pl: 0.75,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: '3px solid',
              borderColor: alpha(theme.palette.primary.main, 0.28),
              borderRadius: '50%',
              color: 'primary.main',
              display: 'flex',
              height: 42,
              justifyContent: 'center',
              width: 42,
            }}
          >
            {trip ? <AccessTimeRoundedIcon /> : <AddLocationAltRoundedIcon />}
          </Box>

          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              fontSize: '0.8rem',
              fontWeight: 900,
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
          >
            {trip
              ? isCurrentTrip
                ? 'Current adventure'
                : 'Next adventure'
              : 'Plan ahead'}
          </Typography>

          {trip ? (
            <>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  fontWeight: 950,
                  letterSpacing: '-0.06em',
                  lineHeight: 0.95,
                }}
              >
                {isCurrentTrip ? 'Now' : daysUntilTrip}
              </Typography>

              <Box>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', fontWeight: 800 }}
                >
                  {isCurrentTrip
                    ? `Exploring ${destination}`
                    : `${daysUntilTrip === 1 ? 'Day' : 'Days'} until ${destination}`}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    alignItems: 'center',
                    color: 'text.secondary',
                    justifyContent: 'center',
                    mt: 0.75,
                  }}
                >
                  <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {formatDateRange(trip)}
                  </Typography>
                </Stack>
              </Box>

              <Button
                LinkComponent={Link}
                href={`/trips/show/${trip.id}`}
                size="small"
                sx={{ fontWeight: 900, textTransform: 'none' }}
              >
                View Itinerary
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}
              >
                No upcoming trips
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 250 }}
              >
                Start a new travel plan and your next adventure will appear
                here.
              </Typography>
              <Button
                LinkComponent={Link}
                href="/discover"
                startIcon={<TravelExploreRoundedIcon />}
                variant="contained"
                size="small"
                sx={{ borderRadius: 2, fontWeight: 900, textTransform: 'none' }}
              >
                Start Planning
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
