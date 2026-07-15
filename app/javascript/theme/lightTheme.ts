import {createTheme} from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
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
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    divider: '#D1D5DB',
    success: {main: '#10B981'},
    warning: {main: '#F59E0B'},
    error: {main: '#EF4444'},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {borderRadius: 8},
        // containedPrimary: { boxShadow: 'none' }
      },
    },
    MuiCard: {
      styleOverrides: {root: {borderRadius: 12}},
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {backgroundColor: '#FFFFFF', color: '#111827'},
      },
    },
  },
})

export default lightTheme
