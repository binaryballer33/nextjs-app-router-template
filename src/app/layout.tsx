import type { Metadata, Viewport } from "next/"
import type { ReactNode } from "react"

import { SessionProvider } from "next-auth/react"
import { auth } from "src/auth/auth"

import NProgress from "src/components/base/nprogress"

import MainLayout from "src/layouts/main-layout"

import ProvidersLayout from "../layouts/providers/providers-layout"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
    colorScheme: "dark",
    initialScale: 1,
    width: "device-width",
}

export const metadata: Metadata = {
    description: "Created By Shaquille Rashad Mandy",
    title: "Starter Next Template",
}

type LayoutProps = {
    children: ReactNode
}

async function Layout({ children }: LayoutProps) {
    const session = await auth()

    return (
        <html lang="en">
            <body>
                <ProvidersLayout>
                    <SessionProvider session={session}>
                        <MainLayout>
                            {children}
                            <NProgress />
                        </MainLayout>
                    </SessionProvider>
                </ProvidersLayout>
            </body>
        </html>
    )
}

export default Layout
