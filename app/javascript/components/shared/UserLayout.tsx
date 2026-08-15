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
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { alpha, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material'
import { ReactNode, useState } from 'react'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Link, router, usePage } from '@inertiajs/react'
import { Avatar, Container } from '@mui/material'
import { NavigationItem } from '@/types/navigation-item'
import { BreadcrumbItem } from '@/types/breadcrumb'
import AppBreadcrumbs from './AppBreadcrumbs'
import appLogo from '@/assets/app_logo.png'
import { useThemeMode } from '@/theme/ThemeModeContext'

const drawerWidth = 280

const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },
  appBar: {
    backdropFilter: 'blur(18px)',
    borderBottom: 1,
    borderColor: 'divider',
    boxShadow: 'none',
  },
  toolbar: {
    minHeight: { xs: 64, md: 72 },
    gap: 2,
  },
  logo: {
    height: 46,
    objectFit: 'contain',
    width: 46,
  },
  drawerHeader: {
    px: 2.5,
    py: 3,
  },
  navList: {
    px: 1.5,
    py: 1,
  },
  navItem: {
    mb: 0.75,
  },
  navText: {
    '& .MuiListItemText-primary': {
      fontSize: '0.95rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
  },
  contentShell: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: '100vh',
    width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
  },
  main: {
    bgcolor: 'background.default',
    flexGrow: 1,
    p: { xs: 2, sm: 3 },
  },
  footer: {
    bgcolor: 'background.paper',
    borderTop: 1,
    borderColor: 'divider',
    py: 2,
  },
}

export default function UserLayout({
  navigationItems,
  breadcrumbs = [],
  children,
}: {
  navigationItems: NavigationItem[]
  breadcrumbs?: BreadcrumbItem[]
  children: ReactNode
}) {
  const theme = useTheme()
  const { mode, toggleThemeMode } = useThemeMode()
  const page = usePage()
  const user = page.props.auth.user
  const initials = user ? `${user.name[0] ?? ''}${user.lastname[0] ?? ''}` : ''
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobileDrawer = () => setMobileOpen(false)

  const isActive = (link: string) =>
    page.url === link || page.url.startsWith(`${link}/`)

  const handleLogout = () => {
    router.delete('/users/sign_out')
  }

  const drawerContent = (
    <>
      <Box sx={styles.drawerHeader}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              alignItems: 'center',
              background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.16)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
              border: 1,
              borderColor: 'divider',
              borderRadius: 3,
              boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.16)}`,
              display: 'flex',
              height: 54,
              justifyContent: 'center',
              overflow: 'hidden',
              width: 54,
            }}
          >
            <Box
              component="img"
              src={appLogo}
              alt="WanderPlan logo"
              sx={styles.logo}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              WanderPlan
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              AI travel workspace
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Divider sx={{ mx: 2 }} />
      <List sx={styles.navList}>
        {navigationItems.map((item) => {
          const active = isActive(item.link)

          return (
            <ListItem key={item.link} disablePadding sx={styles.navItem}>
              <ListItemButton
                LinkComponent={Link}
                href={item.link}
                onClick={closeMobileDrawer}
                selected={active}
                sx={{
                  borderRadius: 3,
                  color: active ? 'primary.dark' : 'text.secondary',
                  minHeight: 48,
                  px: 1.75,
                  transition: theme.transitions.create(
                    ['background-color', 'box-shadow', 'color', 'transform'],
                    {
                      duration: theme.transitions.duration.short,
                    },
                  ),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.dark',
                    transform: 'translateX(2px)',
                  },
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.14),
                    boxShadow: `inset 3px 0 0 ${theme.palette.primary.main}`,
                    color: 'primary.dark',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.18),
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 38,
                    '& svg': { fontSize: 22 },
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} sx={styles.navText} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ mx: 2 }} />
      <List sx={{ px: 1.5, py: 1.5 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              color: 'text.secondary',
              minHeight: 48,
              px: 1.75,
              '&:hover': {
                bgcolor: alpha(theme.palette.error.main, 0.08),
                color: 'error.main',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={styles.navText} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )

  return (
    <Box sx={styles.root}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          ...styles.appBar,
          ml: { md: `${drawerWidth}px` },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={styles.toolbar}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' } }}
            aria-label="Open navigation menu"
          >
            <MenuRoundedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                display: 'block',
                fontWeight: 900,
                letterSpacing: '0.14em',
                lineHeight: 1.2,
              }}
            >
              WanderPlan
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
              }}
            >
              Plan smarter trips with curated destinations and itineraries.
            </Typography>
          </Box>
          <Tooltip
            title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <IconButton
              color="inherit"
              onClick={toggleThemeMode}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                border: 1,
                borderColor: alpha(theme.palette.primary.main, 0.16),
                color: 'primary.main',
                height: 38,
                width: 38,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.14),
                  borderColor: alpha(theme.palette.primary.main, 0.28),
                },
              }}
            >
              {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={user ? `${user.name} ${user.lastname}` : 'User'}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.28)}`,
                color: 'primary.contrastText',
                fontSize: 14,
                fontWeight: 800,
                height: 38,
                width: 38,
              }}
            >
              {initials}
            </Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: { md: drawerWidth } }}
      >
        <Drawer
          ModalProps={{ keepMounted: true }}
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              backgroundImage: `radial-gradient(circle at 15% 8%, ${alpha(theme.palette.primary.main, 0.14)} 0, transparent 32%), radial-gradient(circle at 85% 92%, ${alpha(theme.palette.secondary.main, 0.1)} 0, transparent 34%)`,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          variant="temporary"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
        <Drawer
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundImage: `radial-gradient(circle at 15% 8%, ${alpha(theme.palette.primary.main, 0.12)} 0, transparent 32%), radial-gradient(circle at 85% 92%, ${alpha(theme.palette.secondary.main, 0.08)} 0, transparent 34%)`,
              borderRight: 1,
              borderColor: 'divider',
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box sx={styles.contentShell}>
        <Box component="main" sx={styles.main}>
          <Toolbar />
          <Container fixed maxWidth="xl">
            <AppBreadcrumbs items={breadcrumbs} />
            {children}
          </Container>
        </Box>
        <Box component="footer" sx={styles.footer}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            © 2026 WanderPlan Inc. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
