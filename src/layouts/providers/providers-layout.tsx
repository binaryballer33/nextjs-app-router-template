"use client"

import { type ReactNode } from "react"

import { Provider as ReduxProvider } from "react-redux"

import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import SidebarProvider from "src/contexts/sidebar-context"
import ReactQueryClientProvider from "src/layouts/providers/query-client-provider"
import ThemeProvider from "src/layouts/providers/theme-provider"
import { store } from "src/store"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "nextjs-app-router-mui-template" }}>
            <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <SidebarProvider>
                        <ThemeProvider>
                            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                        </ThemeProvider>
                    </SidebarProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </NextAppDirEmotionCacheProvider>
    )
}
