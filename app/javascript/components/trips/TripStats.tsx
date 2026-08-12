import { Trip } from '@/types/trip'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ReactNode } from 'react'

const statIconStyles = {
  width: 44,
  height: 44,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 2,
  color: 'primary.main',
  backgroundColor: 'rgba(14, 165, 164, 0.1)',
}

function TripStatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack sx={statIconStyles}>{icon}</Stack>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function TripStats({ trip }: { trip: Trip }) {
  const stats = [
    {
      icon: <CalendarMonthOutlinedIcon />,
      label: 'Start date',
      value: dayjs(trip.startDate).format('MMM D, YYYY'),
    },
    {
      icon: <FlagOutlinedIcon />,
      label: 'End date',
      value: dayjs(trip.endDate).format('MMM D, YYYY'),
    },
    {
      icon: <TimelapseOutlinedIcon />,
      label: 'Duration',
      value: `${trip.numberDays} ${trip.numberDays === 1 ? 'day' : 'days'}`,
    },
    {
      icon: <LocationOnOutlinedIcon />,
      label: 'Destination',
      value: trip.destination.location,
    },
  ]

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
          <TripStatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  )
}
