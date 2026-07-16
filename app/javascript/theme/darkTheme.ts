import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0EA5A4',
      dark: '#0F766E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2563EB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0B1220',
      paper: '#0F1724',
    },
    text: {
      primary: '#E6EEF3',
      secondary: '#AAB5C0',
    },
    divider: '#1F2937',
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
        // containedPrimary: { boxShadow: 'none' }
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { backgroundColor: '#0F1724', color: '#E6EEF3' },
      },
    },
  },
})

export default darkTheme
