"use client"

import { type ReactNode } from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"

import "@/i18n/i18n"

import "@/global.css"

type ThemeProviderProps = {
    children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            value={{
                dark: "dark",
                light: "light",
                system: "system",
            }}
        >
            <div className="flex min-h-screen">
                {children}
            </div>
        </NextThemesProvider>
    )
}
