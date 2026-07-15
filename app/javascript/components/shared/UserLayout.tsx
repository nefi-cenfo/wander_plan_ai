import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode } from 'react'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Link, router, usePage } from '@inertiajs/react'
import { Avatar, Container } from '@mui/material'
import { NavigationItem } from '@/types/navigation-item'

const drawerWidth = 240

export default function UserLayout({
  navigationItems,
  children,
}: {
  navigationItems: NavigationItem[]
  children: ReactNode
}) {
  const { auth } = usePage().props
  const user = auth.user
  const initials = user ? `${user.name[0] ?? ''}${user.lastname[0] ?? ''}` : ''

  const handleLogout = () => {
    router.delete('/users/sign_out')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="h1"
            sx={{
              color: 'primary.main',
              fontSize: '1.7rem',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span className="flex-1">WanderPlan</span>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: '32px',
                height: '32px',
                fontSize: '16px',
              }}
            >
              {initials}
            </Avatar>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton LinkComponent={Link} href={item.link}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginTop: 'auto' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <div className="w-full">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            minHeight: 'calc(100vh - 50px)',
          }}
        >
          <Toolbar />
          <Container fixed maxWidth="xl">
            {children}
          </Container>
        </Box>
        <footer className="w-full h-[49px]">
          <Divider />
          <Typography sx={{ textAlign: 'center', lineHeight: '49px' }}>
            © 2024 WanderPlan Inc. All rights reserved.
          </Typography>
        </footer>
      </div>
    </Box>
  )
}
