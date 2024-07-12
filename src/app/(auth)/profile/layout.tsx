"use client"

import { ReactNode } from "react"

import SideBarLayout from "src/layouts/sidebar-layout/index"

type ProfileLayoutProps = {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <SideBarLayout>{children}</SideBarLayout>
}
