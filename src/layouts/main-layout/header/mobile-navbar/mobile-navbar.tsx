import { Box, List, ListProps, ListSubheader, styled, Theme, useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import React, { FC } from 'react'
import { Logo } from 'src/components/base/logo'
import { Scrollbar } from 'src/components/base/scrollbar'
import { NavBarItem } from 'src/models/menu-item'
import { neutral } from 'src/theme/theme'
import { SIDEBAR_WIDTH } from 'src/theme/utils'
import { MobileNavBarNavItem } from './mobile-navbar-nav-item'

const MobileSidebarWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.mode === 'dark' ? neutral[100] : neutral[900],
  background: theme.palette.mode === 'dark' ? neutral[900] : neutral[100],
}))

interface MobileNavBarProps {
  navbar_items?: NavBarItem[]
}

const ListSubheaderWrapper = styled(ListSubheader)<ListProps<'div', { component: 'div' }>>(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? neutral[900] : neutral[100],
  textTransform: 'uppercase',
  fontWeight: 500,
  fontSize: 13,
  color: theme.palette.mode === 'dark' ? neutral[100] : neutral[900],
  lineHeight: theme.spacing(5),
  padding: theme.spacing(0, 2),
}))

export const MobileNavBar: FC<MobileNavBarProps> = ({ navbar_items }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  if (!navbar_items) return null

  return (
    <MobileSidebarWrapper
      component="nav"
      role="navigation"
      sx={{
        width: SIDEBAR_WIDTH,
      }}
    >
      <Box p={2} display="flex" justifyContent={{ xs: 'flex-start', lg: 'space-between' }} alignItems="center">
        <Logo dark isLinkStatic />
      </Box>

      <Box>
        <Box flex={1} overflow="auto" position="relative" zIndex={6}>
          <Scrollbar dark>
            {navbar_items.map((menuItem) => (
              <Box key={menuItem.title}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheaderWrapper component="div" disableSticky={!mdUp}>
                      {menuItem.title}
                    </ListSubheaderWrapper>
                  }
                >
                  {menuItem.subMenu?.map((subItem) => <MobileNavBarNavItem key={subItem.title} item={subItem} />)}
                </List>
              </Box>
            ))}
          </Scrollbar>
        </Box>
      </Box>
    </MobileSidebarWrapper>
  )
}

MobileNavBar.propTypes = {
  navbar_items: PropTypes.array,
}
