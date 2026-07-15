import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import {NavigationItem} from '@/types/navigation-item'

export const menuItems: NavigationItem[] = [
  {
    name: 'Overview',
    icon: InsertChartOutlinedRoundedIcon,
    link: '/',
  },
  {
    name: 'User Management',
    icon: PeopleAltRoundedIcon,
    link: '/',
  },
  {
    name: 'Public View',
    icon: VerifiedUserRoundedIcon,
    link: '/',
  },
]
