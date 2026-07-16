import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import lightTheme from '@/theme/lightTheme'

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
          <CssBaseline />
          <App {...props} />
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
