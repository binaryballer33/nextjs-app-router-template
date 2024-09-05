import type { ReactNode } from "react"

import type { Metadata, Viewport } from "next/"

import { SessionProvider } from "next-auth/react"

import NProgress from "src/components/base/nprogress"
import MainLayout from "src/layouts/main-layout"
import { auth } from "src/utils/auth/auth"

import ProvidersLayout from "../layouts/providers/providers-layout"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "dark",
}

export const metadata: Metadata = {
    title: "Starter Next Template",
    description: "Created By Shaquille Rashad Mandy",
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
