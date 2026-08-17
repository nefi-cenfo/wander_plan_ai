import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { alpha, useTheme } from '@mui/material/styles'

export type AdminStat = {
  value: number
  current_period_count: number
  previous_period_count: number
  change_percent: number
}

export type AdminStats = {
  total_users: AdminStat
  active_premium: AdminStat
  trips_stored: AdminStat
  locations_saved: AdminStat
}

type StatCard = {
  label: string
  stat: AdminStat
  icon: SvgIconComponent
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en').format(value)
}

function formatChange(value: number) {
  const sign = value > 0 ? '+' : ''

  return `${sign}${value}%`
}

export default function AdminStatsWidget({ stats }: { stats: AdminStats }) {
  const theme = useTheme()
  const cards: StatCard[] = [
    {
      label: 'Total Users',
      stat: stats.total_users,
      icon: GroupsRoundedIcon,
    },
    {
      label: 'Active Premium',
      stat: stats.active_premium,
      icon: WorkspacePremiumRoundedIcon,
    },
    {
      label: 'Trips Stored',
      stat: stats.trips_stored,
      icon: LuggageRoundedIcon,
    },
    {
      label: 'Locations Saved',
      stat: stats.locations_saved,
      icon: LocationOnOutlinedIcon,
    },
  ]

  return (
    <Grid container spacing={3}>
      {cards.map((card) => {
        const Icon = card.icon
        const trendColor =
          card.stat.change_percent >= 0 ? 'success.main' : 'error.main'

        return (
          <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                boxShadow: `0 16px 36px ${alpha(theme.palette.secondary.main, 0.06)}`,
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{ alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      borderRadius: 2,
                      color: 'primary.main',
                      display: 'flex',
                      flexShrink: 0,
                      height: 48,
                      justifyContent: 'center',
                      width: 48,
                    }}
                  >
                    <Icon />
                  </Box>

                  <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: 'right' }}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 800 }}
                    >
                      {card.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '1.7rem', md: '2rem' },
                        fontWeight: 950,
                        letterSpacing: '-0.06em',
                        lineHeight: 1.05,
                        mt: 0.5,
                      }}
                    >
                      {formatNumber(card.stat.value)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    mt: 2.5,
                  }}
                >
                  <TrendingUpRoundedIcon
                    sx={{ color: trendColor, fontSize: 17 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: trendColor, fontWeight: 900 }}
                  >
                    {formatChange(card.stat.change_percent)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontWeight: 700 }}
                  >
                    vs last mo.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
