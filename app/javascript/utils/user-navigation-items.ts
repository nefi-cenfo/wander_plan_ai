import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import {NavigationItem} from '@/types/navigation-item'

export const menuItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    icon: DashboardRoundedIcon,
    link: '/',
  },
  {
    name: 'Discover',
    icon: ViewCarouselRoundedIcon,
    link: '/',
  },
  {
    name: 'My Trips',
    icon: FavoriteRoundedIcon,
    link: '/',
  },
  {
    name: 'Billing',
    icon: CreditCardRoundedIcon,
    link: '/',
  },
]
