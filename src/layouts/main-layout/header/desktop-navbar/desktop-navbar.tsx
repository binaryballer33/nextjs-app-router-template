'use client'

import { Box, Stack } from '@mui/material'
import { NavBarItem } from 'src/models/menu-item'
import { DesktopNavBarItem } from './desktop-navbar-item'

const isRouteActive = (route?: string, currentPath?: string, subMenu?: NavBarItem[]): boolean => {
  if (route && route === currentPath) return true
  if (subMenu) {
    for (let item of subMenu) {
      if (item.route && isRouteActive(item.route, currentPath, item.subMenu)) {
        return true
      }
    }
  }
  return false
}

interface DesktopNavBarProps {
  navbar_items?: NavBarItem[]
}

export const DesktopNavBar: React.FC<DesktopNavBarProps> = ({ navbar_items }) => {
  if (!navbar_items) return null

  return (
    <Box position={'relative'}>
      <Stack spacing={0} alignItems="center" flexDirection="row" position={'sticky'} top={0}>
        {navbar_items.map((item, index) => (
          <DesktopNavBarItem key={index} item={item} />
        ))}
      </Stack>
    </Box>
  )
}
