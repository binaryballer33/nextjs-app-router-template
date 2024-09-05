"use client"

import type { ReactNode } from "react"

import SideBarLayout from "src/layouts/sidebar-layout"

type ProfileLayoutProps = {
    children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return <SideBarLayout>{children}</SideBarLayout>
}
