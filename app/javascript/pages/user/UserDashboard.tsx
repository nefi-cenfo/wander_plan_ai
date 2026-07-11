import UserLayout from '@/components/shared/UserLayout'
import {menuItems} from '@/utils/user-navigation-items'

export default function UserDashboard() {
  return (
    <UserLayout navigationItems={menuItems}>
      <h1>This is the user dashboard</h1>
    </UserLayout>
  )
}
