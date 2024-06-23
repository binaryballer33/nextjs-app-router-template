'use client'

import { Box, Stack } from '@mui/material'
import { MenuItem } from 'src/models/menuItem'
import { DesktopNavBarItem } from './desktop-navbar-item'

const isRouteActive = (route?: string, currentPath?: string, subMenu?: MenuItem[]): boolean => {
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

interface DesktopNavbarProps {
  menuItems?: MenuItem[]
}

export const Menu: React.FC<DesktopNavbarProps> = ({ menuItems }) => {
  if (!menuItems) return null

  return (
    <Box position={'relative'}>
      <Stack spacing={0} alignItems="center" flexDirection="row" position={'sticky'} top={0}>
        {menuItems.map((item, index) => (
          <DesktopNavBarItem key={index} item={item} />
        ))}
      </Stack>
    </Box>
  )
}
