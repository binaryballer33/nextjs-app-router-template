import { type ReactNode } from "react"

import ServerProvidersLayout from "@/layouts/providers/server-providers/server-providers-layout"
import ClientProvidersLayout from "@/layouts/providers/client-providers/client-providers-layout"

type LayoutProps = {
    children: ReactNode
}

export default function Providers({ children }: LayoutProps) {
    return (
        <ClientProvidersLayout>
            {/* @ts-expect-error Async Server Component */}
            <ServerProvidersLayout>{children}</ServerProvidersLayout>
        </ClientProvidersLayout>
    )
}
