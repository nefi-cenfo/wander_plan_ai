import UserLayout from '@/components/shared/UserLayout'
import { menuItems } from '@/utils/user-navigation-items'
import type { ReactNode } from 'react'

function UserDashboard() {
  return <h1>This is the user dashboard</h1>
}

UserDashboard.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default UserDashboard
