'use client'

import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, type FC, type ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Toastr } from 'src/components/base/toastr' // for notification overlays
import { store, useSelector } from 'src/store'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import 'src/i18n/i18n' // for multilanguage support
import 'src/global.css' // for global styles
import 'aos/dist/aos.css' // for animations and transitions on scroll
import AOS from 'aos'
import { AuthProvider } from 'src/contexts/auth-context' // for authentication with Supabase

import { SidebarProvider } from 'src/contexts/sidebar-context'
import { darkTheme, lightTheme } from 'src/theme/theme'

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode } = useSelector((state) => state.theme)
  const theme = mode === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    // Initialize AOS library for animations and transitions on scroll
    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    })
  }, [])

  // Refresh AOS library on theme change
  useEffect(() => {
    AOS.refresh()
  }, [mode])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" minHeight="100vh">
        {children}
      </Box>
      <Toastr />
    </MuiThemeProvider>
  )
}

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mandy-tec' }}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* Once Supabase project is creating and you have the api keys you can uncomment the AuthProvider */}
          <AuthProvider>
            <SidebarProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </SidebarProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
