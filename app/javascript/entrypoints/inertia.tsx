import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { ReactNode, useEffect, useState } from 'react'

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import lightTheme from '@/theme/lightTheme'
import darkTheme from '@/theme/darkTheme'
import { APIProvider } from '@vis.gl/react-google-maps'
import GlobalLoader from '@/components/shared/GlobalLoader'
import {
  ThemeMode,
  ThemeModeContext,
} from '@/theme/ThemeModeContext'

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const themeModeStorageKey = 'wanderplan-theme-mode'

function getStoredThemeMode(): ThemeMode {
  const storedMode = window.localStorage.getItem(themeModeStorageKey)

  return storedMode === 'dark' ? 'dark' : 'light'
}

function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getStoredThemeMode)
  const theme = mode === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    window.localStorage.setItem(themeModeStorageKey, mode)
    document.documentElement.dataset.theme = mode
  }, [mode])

  const toggleThemeMode = () => {
    setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

void createInertiaApp({
  pages: '../pages',

  strictMode: true,

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    visitOptions: () => {
      return { queryStringArrayFormat: 'brackets' }
    },
  },

  setup({ el, App, props }) {
    if (!el) {
      throw new Error('Missing Inertia root element')
    }
    createRoot(el).render(
      <StyledEngineProvider injectFirst>
        <ThemeModeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <APIProvider apiKey={googleMapsKey}>
              <CssBaseline />
              <GlobalLoader />
              <App {...props} />
            </APIProvider>
          </LocalizationProvider>
        </ThemeModeProvider>
      </StyledEngineProvider>,
    )
  },
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  // Feel free to remove this `catch` if you don't need it.
  if (document.getElementById('app')) {
    throw error
  } else {
    console.error(
      'Missing root element.\n\n' +
        'If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n' +
        'Consider moving <%= vite_typescript_tag "inertia.tsx" %> to the Inertia-specific layout instead.',
    )
  }
})
