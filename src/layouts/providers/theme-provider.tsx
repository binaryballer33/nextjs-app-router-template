"use client"

import type { ReactNode } from "react"

import { useEffect } from "react"

import AOS from "aos"

import { Box, CssBaseline } from "@mui/material"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"

import Toastr from "src/components/base/toastr"

import "src/i18n/i18n"
import { useSelector } from "src/store"
import { darkTheme, lightTheme } from "src/theme/theme" // for multilanguage support
import "src/global.css" // for global styles
import "aos/dist/aos.css" // for animations and transitions on scroll

type ThemeProviderProps = {
    children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const { mode } = useSelector((state) => state.theme)
    const theme = mode === "dark" ? darkTheme : lightTheme

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side")
        if (jssStyles && jssStyles.parentElement) jssStyles.parentElement.removeChild(jssStyles)

        // Initialize AOS library for animations and transitions on scroll
        AOS.init({
            delay: 50,
            duration: 500,
            easing: "ease-in-out",
            once: true,
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
