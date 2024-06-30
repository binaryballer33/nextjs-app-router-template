import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { type FC, type ReactNode } from 'react'
import { useMobileNav } from 'src/hooks/use-mobile-nav'
import { useVerticalNavBarItems } from 'src/router/vertical-navbar-routes'
import { Sidebar } from './sidebar'

interface SideBarLayoutProps {
  children?: ReactNode
}

export const SideBarLayout: FC<SideBarLayoutProps> = (props) => {
  const { children } = props
  const navbar_items = useVerticalNavBarItems()
  const mobileNav = useMobileNav()

  return (
    <Box display={'flex'} gap={4}>
      <Sidebar
        navbar_items={navbar_items}
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
}
