import { Link } from '@inertiajs/react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { alpha, useTheme } from '@mui/material/styles'

type CtaCard = {
  title: string
  description: string
  href: string
  icon: SvgIconComponent
}

const ctaCards: CtaCard[] = [
  {
    title: 'Discover',
    description: 'Get AI recommendations',
    href: '/discover',
    icon: AutoAwesomeRoundedIcon,
  },
  {
    title: 'Saved Trips',
    description: 'Resume your planning',
    href: '/trips',
    icon: CalendarMonthRoundedIcon,
  },
  {
    title: 'Subscription',
    description: 'Manage your account',
    href: '/checkout',
    icon: CreditCardRoundedIcon,
  },
]

export default function DashboardCtaCards() {
  const theme = useTheme()

  return (
    <Grid container spacing={2.5}>
      {ctaCards.map((card) => {
        const Icon = card.icon

        return (
          <Grid key={card.title} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                boxShadow: `0 16px 36px ${alpha(theme.palette.secondary.main, 0.06)}`,
                height: '100%',
                transition: theme.transitions.create(
                  ['border-color', 'box-shadow', 'transform'],
                  { duration: theme.transitions.duration.short },
                ),
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.32),
                  boxShadow: `0 20px 42px ${alpha(theme.palette.primary.main, 0.12)}`,
                  transform: 'translateY(-2px)',
                },
                '&:hover .dashboard-cta-arrow': {
                  color: 'primary.main',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <CardActionArea
                LinkComponent={Link}
                href={card.href}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center' }}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
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

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.15,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.25,
                          mt: 0.35,
                        }}
                      >
                        {card.description}
                      </Typography>
                    </Box>

                    <ArrowForwardRoundedIcon
                      className="dashboard-cta-arrow"
                      sx={{
                        color: 'text.secondary',
                        fontSize: 20,
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
          </Grid>
        )
      })}
    </Grid>
  )
}
