'use client'

import AppsTwoToneIcon from '@mui/icons-material/AppsTwoTone'
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import LockIcon from '@mui/icons-material/Lock'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  styled,
  SwipeableDrawer,
  Theme,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { DividerLight } from 'src/components/base/styles/card'
import { useAuth } from 'src/hooks/use-auth'
import { useDialog } from 'src/hooks/use-dialog'
import { useMobileNav } from 'src/hooks/use-mobile-nav'
import { usePopover } from 'src/hooks/use-popover'
import { NavBarItem } from 'src/models/navbar-item'
import { routes } from 'src/router/navigation-routes'
import { neutral } from 'src/theme/theme'
import { DesktopNavBar } from './desktop-navbar/desktop-navbar'
import { MobileNavBar } from './mobile-navbar/mobile-navbar'
import LanguageDropdown from './navbar-icons/language-icon/language-icon-dropdown'
import { Logo } from './navbar-icons/logo/logo'
import { ProfileIconDropdown } from './navbar-icons/profile-icon-dropdown/profile-icon-dropdown-content'
import { BasicSpotlightSearch } from './navbar-icons/search-icon/search-icon'
import ThemeModeToggler from './navbar-icons/theme-mode-toggler/theme-mode-toggler'

// manage the navbar items, their title, icons and routes from here. This is for both desktop and mobile navbars
const useNavBarItems = (): NavBarItem[] => {
  const { t } = useTranslation()

  return [
    {
      title: t('Dashboards'),
      icon: <DashboardTwoToneIcon />,
      route: routes.dummy,
      subMenu: [
        {
          title: t('Reports'),
          route: routes.dummy,
        },
        {
          title: t('Expenses'),
          route: routes.dummy,
        },
        {
          title: t('Statistics'),
          route: routes.dummy,
        },
        {
          title: t('Automation'),
          route: routes.dummy,
        },
        {
          title: t('Analytics'),
          route: routes.dummy,
        },
        {
          title: t('Hospital'),
          route: routes.dummy,
        },
        {
          title: t('Helpdesk'),
          route: routes.dummy,
        },
        {
          title: t('Monitoring'),
          route: routes.dummy,
        },
      ],
    },
    {
      title: t('Applications'),
      icon: <AppsTwoToneIcon />,
      route: routes.dummy,
      subMenu: [
        {
          title: t('Calendar'),
          route: routes.dummy,
        },
        {
          title: t('File manager'),
          route: routes.dummy,
        },
        {
          title: t('Jobs platform'),
          route: routes.dummy,
        },
        {
          title: t('Mailbox'),
          route: routes.dummy,
        },
        {
          title: t('Messenger'),
          route: routes.dummy,
        },
        {
          title: t('Projects board'),
          route: routes.dummy,
        },
        {
          title: t('Tasks'),
          route: routes.dummy,
        },
      ],
    },
    {
      title: t('Management'),
      icon: <BusinessCenterTwoToneIcon />,
      route: routes.dummy,
      subMenu: [
        {
          title: t('Users'),
          route: routes.dummy,
          subMenu: [
            {
              title: t('Listing'),
              route: routes.dummy,
            },
            {
              title: t('User profile'),
              route: routes.dummy,
            },
          ],
        },
        {
          title: t('Projects'),
          route: routes.dummy,
        },
        {
          title: t('Commerce'),
          route: routes.dummy,
          subMenu: [
            {
              title: t('Shop front'),
              route: routes.dummy,
            },
            {
              title: t('Shop listing'),
              route: routes.dummy,
            },
            {
              title: t('Product details'),
              route: routes.dummy,
            },
            {
              title: t('Create product'),
              route: routes.dummy,
            },
          ],
        },
        {
          title: t('Invoices'),
          route: routes.dummy,
          subMenu: [
            {
              title: t('Listing'),
              route: routes.dummy,
            },
            {
              title: t('Invoice details'),
              route: routes.dummy,
            },
          ],
        },
      ],
    },
    {
      title: t('Settings'),
      icon: <SettingsIcon />,
      route: routes.dummy,
    },
  ]
}

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  top: 0,
  background: theme.palette.background.default,
  color: theme.palette.mode === 'dark' ? neutral[100] : neutral[900],
  zIndex: 10,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}))

export const Header = () => {
  const router = useRouter()
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const theme = useTheme()
  const dialog = useDialog()
  const navbar_items = useNavBarItems()
  const popover = usePopover<HTMLButtonElement>()
  const { handleClose, handleOpen, open } = useMobileNav()
  const { user } = useAuth()

  return (
    <>
      <HeaderWrapper role="banner" elevation={0}>
        <Stack py={3} flex={1} direction="row" justifyContent="space-between" alignItems="center">
          {/* Desktop NavBar Section */}
          <Stack
            direction="row"
            divider={
              <DividerLight
                sx={{
                  height: 24,
                  alignSelf: 'center',
                }}
                orientation="vertical"
                flexItem
              />
            }
            alignItems="center"
            spacing={2}
          >
            <Box sx={{ transform: 'scale(.86)' }}>
              <Logo />
            </Box>

            {/* Desktop NavBar */}
            {lgUp && <DesktopNavBar navbar_items={navbar_items} />}
          </Stack>

          {/* Header Icons Section */}
          <Stack
            direction="row"
            divider={
              <DividerLight
                sx={{
                  height: 24,
                  alignSelf: 'center',
                }}
                orientation="vertical"
                flexItem
              />
            }
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
          >
            {/* Other Header Icons */}
            <>
              <Stack display="flex" spacing={1} direction="row" alignItems="center">
                {smUp && (
                  <>
                    <IconButton
                      onClick={dialog.handleOpen}
                      color="inherit"
                      sx={{
                        '&:hover': {
                          background: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        p: 1,
                        '& .MuiSvgIcon-root': {
                          fontSize: 22,
                        },
                      }}
                    >
                      <Tooltip title="Search The Page">
                        <SearchRoundedIcon />
                      </Tooltip>
                    </IconButton>
                  </>
                )}
              </Stack>

              <LanguageDropdown
                sx={{
                  '&:hover': {
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                  p: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 22,
                  },
                }}
              />

              <ThemeModeToggler />
            </>

            {/* Login Icon & Profile Icon */}
            {user ? (
              <Tooltip title="User">
                <IconButton
                  id="profile-button"
                  color="primary"
                  sx={{
                    p: 0,
                    '&:hover': {
                      boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                    },
                  }}
                  aria-controls={popover.open ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={popover.open ? 'true' : undefined}
                  onClick={popover.handleOpen}
                  ref={popover.anchorRef}
                >
                  <Avatar
                    alt={'Shaquille Mandy'}
                    src={''}
                    sx={{
                      borderRadius: 'inherit',
                      height: 36,
                      width: 36,
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
                <IconButton onClick={() => router.push('/login')}>
                  <LockIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}

            {/* Show Mobile Menu Icon Button */}
            {!lgUp && (
              <IconButton
                onClick={handleOpen}
                color="inherit"
                sx={{
                  '&:hover': {
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                  p: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: 22,
                  },
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Stack>

          {/* NavBar Dropdowns and Overlays */}
          <Fragment>
            <BasicSpotlightSearch onClose={dialog.handleClose} open={dialog.open} />

            <ProfileIconDropdown
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              anchorEl={popover.anchorRef.current}
              onClose={popover.handleClose}
              open={popover.open}
            />
          </Fragment>
        </Stack>
      </HeaderWrapper>

      {/* Mobile NavBar Section */}
      {!lgUp && (
        <SwipeableDrawer
          anchor="left"
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              overflow: 'hidden',
              backgroundColor: neutral[900],
              boxShadow: (theme) => theme.shadows[0],
            },
          }}
          variant="temporary"
        >
          <MobileNavBar navbar_items={navbar_items} />
        </SwipeableDrawer>
      )}
    </>
  )
}
