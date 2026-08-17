import UserManagementStatsCards from '@/components/admin/UserManagementStatsCards'
import type { UserManagementStats } from '@/components/admin/UserManagementStatsCards'
import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/admin-navigation-items'
import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

function UserManagement({
  user_management_stats,
}: {
  user_management_stats: UserManagementStats
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
        User Management
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Manage, monitor, and support WanderPlan users across all tiers.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <UserManagementStatsCards stats={user_management_stats} />
      </Box>
    </>
  )
}

UserManagement.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default UserManagement
