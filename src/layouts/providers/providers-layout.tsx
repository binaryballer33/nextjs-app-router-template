import { type ReactNode } from "react"

import ClientProvidersLayout from "src/layouts/providers/client-providers-layout"
import ServerProvidersLayout from "src/layouts/providers/server-providers-layout"

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <ClientProvidersLayout>
            <ServerProvidersLayout>{children}</ServerProvidersLayout>
        </ClientProvidersLayout>
    )
}
