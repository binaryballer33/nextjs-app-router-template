import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { type FC, type ReactNode } from 'react'
import { useMobileNav } from 'src/hooks/use-mobile-nav'
import { NavBarItem } from 'src/models/navbar-item'
import { Sidebar } from './sidebar'

interface SideBarLayoutProps {
  children?: ReactNode
  menuItems?: NavBarItem[]
}

export const SideBarLayout: FC<SideBarLayoutProps> = (props) => {
  const { children, menuItems } = props
  const mobileNav = useMobileNav()

  return (
    <Box display={'flex'} gap={4}>
      <Sidebar
        menuItems={menuItems}
        onClose={mobileNav.handleClose}
        open={mobileNav.open}
        onOpen={mobileNav.handleOpen}
      />
      <Box
        flex={1}
        overflow="hidden"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

SideBarLayout.propTypes = {
  children: PropTypes.node,
  menuItems: PropTypes.array,
}
