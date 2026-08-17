import AdminStatsWidget from '@/components/admin/AdminStatsWidget'
import type { AdminStats } from '@/components/admin/AdminStatsWidget'
import UserGrowthChart from '@/components/admin/UserGrowthChart'
import type { UserGrowthChartData } from '@/components/admin/UserGrowthChart'
import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/admin-navigation-items'
import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

function AdminDashboard({
  admin_stats,
  user_growth_chart,
}: {
  admin_stats: AdminStats
  user_growth_chart: UserGrowthChartData
}) {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        Admin Overview
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Platform performance and system health monitoring.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <AdminStatsWidget stats={admin_stats} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <UserGrowthChart data={user_growth_chart} />
      </Box>
    </>
  )
}

AdminDashboard.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default AdminDashboard
