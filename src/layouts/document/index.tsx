"use client"

import { useEffect, type ReactNode } from "react"

import { Box, CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Provider as ReduxProvider } from "react-redux"
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir"

import Toastr from "src/components/base/toastr" // for notification overlays
import { store, useSelector } from "src/store"

import "src/i18n/i18n" // for multilanguage support
import "src/global.css" // for global styles
import "aos/dist/aos.css" // for animations and transitions on scroll

import AOS from "aos"

import ReactQueryClientProvider from "src/api/query-client-provider"
import AuthProvider from "src/contexts/auth-context" // for authentication with Supabase
import SidebarProvider from "src/contexts/sidebar-context"
import { darkTheme, lightTheme } from "src/theme/theme"

type ThemeProviderProps = {
    children: ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const { mode } = useSelector((state) => state.theme)
    const theme = mode === "dark" ? darkTheme : lightTheme

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side")
        if (jssStyles && jssStyles.parentElement) jssStyles.parentElement.removeChild(jssStyles)

        // Initialize AOS library for animations and transitions on scroll
        AOS.init({
            once: true,
            delay: 50,
            duration: 500,
            easing: "ease-in-out",
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

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mandy-tec" }}>
            <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <SidebarProvider>
                            <ThemeProvider>
                                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                            </ThemeProvider>
                        </SidebarProvider>
                    </AuthProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </NextAppDirEmotionCacheProvider>
    )
}
