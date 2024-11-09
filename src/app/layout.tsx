import type { Viewport } from "next/"
import type { ReactNode } from "react"

import NProgress from "src/components/base/nprogress"

import MainLayout from "src/layouts/main-layout"
import ProvidersLayout from "src/layouts/providers/providers-layout"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
    colorScheme: "dark",
    initialScale: 1,
    width: "device-width",
}

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <ProvidersLayout>
                    <MainLayout>
                        {children}
                        <NProgress />
                    </MainLayout>
                </ProvidersLayout>
            </body>
        </html>
    )
}
