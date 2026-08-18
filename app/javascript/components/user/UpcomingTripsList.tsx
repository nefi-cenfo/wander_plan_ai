import type { Trip } from '@/types/trip'
import { Link } from '@inertiajs/react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

const styles: Record<string, SxProps<Theme>> = {
  sectionHeader: {
    alignItems: { xs: 'flex-start', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 1.5,
    justifyContent: 'space-between',
    mb: 2,
  },
  card: {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    boxShadow: '0 16px 36px rgba(37, 99, 235, 0.06)',
    overflow: 'hidden',
  },
}

function toLocalDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

function formatDateRange(trip: Trip) {
  const startDate = toLocalDate(trip.startDate)
  const endDate = toLocalDate(trip.endDate)
  const start = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
  }).format(startDate)
  const end = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(endDate)

  return `${start} - ${end}`
}

export default function UpcomingTripsList({ trips }: { trips: Trip[] }) {
  const theme = useTheme()

  return (
    <Box>
      <Stack sx={styles.sectionHeader}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.35rem', md: '1.5rem' },
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          >
            Upcoming Trips
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Pick up right where you left off.
          </Typography>
        </Box>

        <Button
          LinkComponent={Link}
          href="/trips"
          variant="outlined"
          sx={{
            alignSelf: { xs: 'stretch', sm: 'center' },
            borderRadius: 2,
            fontWeight: 800,
            px: 2,
            textTransform: 'none',
          }}
        >
          View All
        </Button>
      </Stack>

      {trips.length ? (
        <Stack spacing={1.5}>
          {trips.map((trip) => (
            <Card
              key={trip.id}
              elevation={0}
              sx={{
                ...styles.card,
                transition: theme.transitions.create(
                  ['border-color', 'box-shadow', 'transform'],
                  { duration: theme.transitions.duration.short },
                ),
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  boxShadow: `0 18px 42px ${alpha(theme.palette.primary.main, 0.12)}`,
                  transform: 'translateY(-2px)',
                },
                '&:hover .upcoming-trip-arrow': {
                  color: 'primary.main',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <CardActionArea
                LinkComponent={Link}
                href={`/trips/show/${trip.id}`}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center' }}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        borderRadius: 1.5,
                        color: 'text.secondary',
                        display: 'flex',
                        flexShrink: 0,
                        height: 42,
                        justifyContent: 'center',
                        width: 42,
                      }}
                    >
                      <MapOutlinedIcon />
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {trip.destination.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
                          mt: 0.25,
                        }}
                      >
                        {formatDateRange(trip)}
                      </Typography>
                    </Box>

                    <ArrowForwardRoundedIcon
                      className="upcoming-trip-arrow"
                      sx={{
                        color: 'text.secondary',
                        fontSize: 22,
                        transition: theme.transitions.create(
                          ['color', 'transform'],
                          { duration: theme.transitions.duration.short },
                        ),
                      }}
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card elevation={0} sx={styles.card}>
          <CardContent sx={{ p: 3 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 2,
                  color: 'primary.main',
                  display: 'flex',
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                }}
              >
                <TravelExploreRoundedIcon />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  No upcoming trips yet
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mt: 0.5 }}
                >
                  Start a new travel plan and it will appear here.
                </Typography>
              </Box>
              <Button
                LinkComponent={Link}
                href="/discover"
                variant="contained"
                sx={{ borderRadius: 2, fontWeight: 800, textTransform: 'none' }}
              >
                Start Planning
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
