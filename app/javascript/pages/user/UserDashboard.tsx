import DashboardCtaCards from '@/components/user/DashboardCtaCards'
import UserGreetingWidget from '@/components/user/UserGreetingWidget'
import TravelStatsWidget from '@/components/user/TravelStatsWidget'
import type { TravelStats } from '@/components/user/TravelStatsWidget'
import UpcomingTripsList from '@/components/user/UpcomingTripsList'
import UpcomingTripWidget from '@/components/user/UpcomingTripWidget'
import UserLayout from '@/components/shared/UserLayout'
import type { Trip } from '@/types/trip'
import { menuItems } from '@/utils/user-navigation-items'
import { usePage } from '@inertiajs/react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import type { ReactNode } from 'react'

function UserDashboard({
  featured_trip,
  travel_stats,
  upcoming_trips,
}: {
  featured_trip: Trip | null
  travel_stats: TravelStats
  upcoming_trips: Trip[]
}) {
  const { auth } = usePage().props

  return (
    <Box>
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <UserGreetingWidget user={auth.user} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <UpcomingTripWidget trip={featured_trip} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <DashboardCtaCards />
      </Box>
      <Grid container spacing={3} sx={{ alignItems: 'stretch', mt: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <UpcomingTripsList trips={upcoming_trips} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TravelStatsWidget stats={travel_stats} />
        </Grid>
      </Grid>
    </Box>
  )
}

UserDashboard.layout = (page: ReactNode) => (
  <UserLayout
    navigationItems={menuItems}
    breadcrumbs={[{ label: 'Dashboard' }]}
  >
    {page}
  </UserLayout>
)

export default UserDashboard
