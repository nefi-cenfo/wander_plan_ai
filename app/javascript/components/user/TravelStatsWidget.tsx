import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

export type TravelStats = {
  locations_visited: number
  upcoming_trips: number
  completed_trips: number
  ai_itineraries: number
}

type StatCard = {
  label: string
  value: number
  icon: SvgIconComponent
}

const styles: Record<string, SxProps<Theme>> = {
  card: {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    boxShadow: '0 16px 36px rgba(37, 99, 235, 0.06)',
    height: '100%',
  },
  tile: {
    bgcolor: 'background.default',
    borderRadius: 3,
    height: '100%',
    p: 2,
    textAlign: 'center',
  },
}

function formatStat(value: number) {
  return value === 0 ? '--' : value.toString().padStart(2, '0')
}

export default function TravelStatsWidget({ stats }: { stats: TravelStats }) {
  const theme = useTheme()
  const statCards: StatCard[] = [
    {
      label: 'Locations Visited',
      value: stats.locations_visited,
      icon: LocationOnOutlinedIcon,
    },
    {
      label: 'Upcoming Trips',
      value: stats.upcoming_trips,
      icon: LuggageRoundedIcon,
    },
    {
      label: 'Completed Trips',
      value: stats.completed_trips,
      icon: CheckCircleOutlineRoundedIcon,
    },
    {
      label: 'AI Itineraries',
      value: stats.ai_itineraries,
      icon: AutoAwesomeRoundedIcon,
    },
  ]

  return (
    <Card elevation={0} sx={styles.card}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
          <AnalyticsRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography
            variant="h5"
            sx={{
              fontSize: '1.05rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Travel Stats
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {statCards.map((stat) => {
            const Icon = stat.icon

            return (
              <Grid key={stat.label} size={{ xs: 6 }}>
                <Box sx={styles.tile}>
                  <Icon
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.72),
                      fontSize: 20,
                      mb: 0.75,
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.35rem',
                      fontWeight: 950,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {formatStat(stat.value)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      lineHeight: 1.2,
                      mt: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}
