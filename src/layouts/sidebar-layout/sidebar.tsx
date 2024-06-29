import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone'
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone'
import {
  alpha,
  Box,
  Drawer,
  IconButton,
  styled,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PropTypes from 'prop-types'
import { FC, useState } from 'react'
import { Scrollbar } from 'src/components/base/scrollbar'
import { useSidebarContext } from 'src/contexts/sidebar-context'
import { useAuth } from 'src/hooks/use-auth'
import { NavBarItem } from 'src/models/navbar-item'
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from 'src/theme/utils'
import SidebarFooter from './sidebar-footer'
import { SidebarNavMenu } from './sidebar-nav-menu'
import { SidebarNavMenuCollapsed } from './sidebar-nav-menu-collapsed'
import TenantSwitcher from './sidebar-tenant-switcher'

const SidebarWrapper = styled(Box)(({ theme }) => ({
  height: '100dvh',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
}))

interface SidebarProps {
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  menuItems?: NavBarItem[]
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onClose, onOpen, menuItems, open, ...other } = props

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const sampleTenants = [
    {
      id: 1,
      name: 'TechSolutions',
      logo: '/placeholders/logo/adobe.jpg',
      description: 'A leading tech consultancy firm.',
    },
    {
      id: 2,
      name: 'GreenGrocers',
      logo: '/placeholders/logo/ibm.jpg',
      description: 'Organic produce suppliers since 1990.',
    },
    {
      id: 3,
      name: 'UrbanArch',
      logo: '/placeholders/logo/oracle.jpg',
      description: 'Modern architectural designs and solutions.',
    },
  ]

  const [currentTenant, setCurrentTenant] = useState(sampleTenants[0])
  const handleTenantSwitch = (tenant: any) => setCurrentTenant(tenant)
  const { user } = useAuth()
  const theme = useTheme()
  const { isSidebarCollapsed, isSidebarHovered, toggleSidebarCollapsed, toggleSidebarHover } = useSidebarContext()

  const sidebarContent = (
    <SidebarWrapper
      component="nav"
      role="navigation"
      sx={{
        width:
          mdUp && isSidebarCollapsed ? (isSidebarHovered ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED) : SIDEBAR_WIDTH,

        '&::before': {
          content: '""',
          width: '280px',
          height: '250px',
          position: 'absolute',
          top: '-95px',
          left: '-85px',
          display: 'block',
        },
        '&::after': {
          content: '""',
          width: '280px',
          height: '250px',
          position: 'absolute',
          bottom: '-95px',
          right: '-85px',
          display: 'block',
        },
      }}
    >
      <Box
        p={2}
        display="flex"
        justifyContent={{
          xs: 'flex-start',
          md: mdUp && isSidebarCollapsed ? (isSidebarHovered ? 'space-between' : 'center') : 'space-between',
        }}
        alignItems="center"
      >
        <Typography variant="body1" color="primary">
          Welcome {user?.email.slice(0, user?.email.indexOf('@'))}
        </Typography>

        {lgUp && (
          <IconButton
            sx={{
              display: mdUp && isSidebarCollapsed ? (isSidebarHovered ? 'flex' : 'none') : 'flex',

              color: theme.palette.text.secondary,
              textAlign: 'left',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.palette.divider,

              '&:hover': {
                background: theme.palette.action.hover,
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
              },
            }}
            size="small"
            onClick={toggleSidebarCollapsed}
          >
            {isSidebarCollapsed ? (
              <KeyboardArrowRightTwoToneIcon fontSize="small" />
            ) : (
              <KeyboardArrowLeftTwoToneIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>

      <Box flex={1} overflow="auto" position="relative" zIndex={6}>
        <Scrollbar dark>
          <TenantSwitcher
            sidebarCollapsed={isSidebarCollapsed}
            isHovered={isSidebarHovered}
            tenants={sampleTenants}
            currentTenant={currentTenant}
            onSwitch={handleTenantSwitch}
          />
          {mdUp && isSidebarCollapsed ? (
            isSidebarHovered ? (
              <SidebarNavMenu menuItems={menuItems} />
            ) : (
              <SidebarNavMenuCollapsed navbar_items={menuItems} />
            )
          ) : (
            <SidebarNavMenu menuItems={menuItems} />
          )}
        </Scrollbar>
      </Box>
      {mdUp && isSidebarCollapsed ? isSidebarHovered && <SidebarFooter /> : <SidebarFooter />}
    </SidebarWrapper>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        ModalProps={{
          keepMounted: true,
        }}
        onMouseEnter={() => toggleSidebarHover(true)}
        onMouseLeave={() => toggleSidebarHover(false)}
        PaperProps={{
          // @ts-ignore
          sx: {
            overflow: 'hidden',
            border: 0,
            top: '90px !important', // places the sidebar below the header
            left: '24px !important',
            zIndex: 5,
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            width: isSidebarCollapsed ? (isSidebarHovered ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED) : SIDEBAR_WIDTH,
            boxShadow: (theme) =>
              isSidebarCollapsed ? (isSidebarHovered ? theme.shadows[24] : theme.shadows[0]) : theme.shadows[0],

            position: isSidebarCollapsed ? 'sticky' : 'sticky',
            height: '100dvh',
            transition: (theme) => theme.transitions.create(['width', 'box-shadow']),
          },
        }}
        variant="persistent"
        {...other}
      >
        {sidebarContent}
      </Drawer>
    )
  }

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={onClose || (() => {})}
      onOpen={onOpen || (() => {})}
      open={open}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
          boxShadow: (theme) => theme.shadows[24],
        },
      }}
      variant="temporary"
      {...other}
    >
      {sidebarContent}
    </SwipeableDrawer>
  )
}

Sidebar.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  menuItems: PropTypes.array,
}
