import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { alpha, useTheme } from '@mui/material/styles'

export type UserManagementStats = {
  total_users: number
  premium_users: number
  basic_users: number
  new_users_this_month: number
}

type StatCard = {
  label: string
  value: number
  helper: string
  icon: SvgIconComponent
  color: 'primary' | 'secondary' | 'success' | 'warning'
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en').format(value)
}

export default function UserManagementStatsCards({
  stats,
}: {
  stats: UserManagementStats
}) {
  const theme = useTheme()
  const cards: StatCard[] = [
    {
      label: 'Total Users',
      value: stats.total_users,
      helper: 'Non-admin accounts',
      icon: GroupsRoundedIcon,
      color: 'primary',
    },
    {
      label: 'Premium Users',
      value: stats.premium_users,
      helper: 'Active or trialing',
      icon: WorkspacePremiumRoundedIcon,
      color: 'warning',
    },
    {
      label: 'Basic Users',
      value: stats.basic_users,
      helper: 'Free tier accounts',
      icon: PersonOutlineRoundedIcon,
      color: 'secondary',
    },
    {
      label: 'New This Month',
      value: stats.new_users_this_month,
      helper: 'Created this month',
      icon: CalendarMonthRoundedIcon,
      color: 'success',
    },
  ]

  return (
    <Grid container spacing={3}>
      {cards.map((card) => {
        const Icon = card.icon
        const color = theme.palette[card.color].main

        return (
          <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                boxShadow: `0 16px 36px ${alpha(color, 0.08)}`,
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
                      bgcolor: alpha(color, 0.1),
                      borderRadius: 2,
                      color,
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
                      {formatNumber(card.value)}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    fontWeight: 700,
                    mt: 2.5,
                    textAlign: 'right',
                  }}
                >
                  {card.helper}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
