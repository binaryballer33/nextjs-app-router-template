'use client'

import React from 'react'
import { SideBarLayout } from 'src/layouts/sidebar-layout/index'

type ProfileLayoutProps = {
  children: React.ReactNode
}

function ProfileLayout({ children }: ProfileLayoutProps) {
  return <SideBarLayout>{children}</SideBarLayout>
}

export default ProfileLayout
