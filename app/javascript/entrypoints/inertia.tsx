import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import lightTheme from '@/theme/lightTheme'
import { APIProvider } from '@vis.gl/react-google-maps'
import GlobalLoader from '@/components/shared/GlobalLoader'
// import darkTheme from '@/theme/darkTheme'

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

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
        <ThemeProvider theme={lightTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <APIProvider apiKey={googleMapsKey}>
              <CssBaseline />
              <GlobalLoader />
              <App {...props} />
            </APIProvider>
          </LocalizationProvider>
        </ThemeProvider>
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
