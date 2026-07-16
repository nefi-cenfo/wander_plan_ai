import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/admin-navigation-items'
import type { ReactNode } from 'react'

function AdminDashboard() {
  return <h1>This is the admin dashboard</h1>
}

AdminDashboard.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default AdminDashboard
