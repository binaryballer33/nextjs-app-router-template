import { type ReactNode } from "react"

import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth/auth"

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    const session = await auth()
    return <SessionProvider session={session}>{children}</SessionProvider>
}
