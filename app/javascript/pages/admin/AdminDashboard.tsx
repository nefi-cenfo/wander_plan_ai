import UserLayout from '@/components/shared/UserLayout'
import {menuItems} from '@/utils/admin-navigation-items'

export default function AdminDashboard() {
  return (
    <UserLayout navigationItems={menuItems}>
      <h1>This is the admin dashboard</h1>
    </UserLayout>
  )
}
