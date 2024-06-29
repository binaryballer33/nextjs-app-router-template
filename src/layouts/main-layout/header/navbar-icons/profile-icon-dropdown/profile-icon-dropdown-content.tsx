'use client'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { alpha, Box, Button, Divider, ListItemText, Menu, MenuItem, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { signOut } from 'src/actions/auth/sign-out'
import { useAuth } from 'src/hooks/use-auth'
import { NavBarItem } from 'src/models/navbar-item'
import { routes } from 'src/router/navigation-routes'
import { neutral } from 'src/theme/theme'
import AvatarTitleDescriptionAlternate from './profile-icon-avatar-title-description'

const profile_icon_dropdown_nav_items: NavBarItem[] = [
  { title: 'My Profile', icon: <AccountBoxIcon />, route: routes.user.profile },
  { title: 'Profile settings', icon: <ManageAccountsIcon />, route: routes.dummy },
  { title: 'Cart', icon: <ShoppingCartIcon />, route: routes.dummy },
  { title: 'Orders', icon: <ReceiptIcon />, route: routes.dummy },
]

interface Origin {
  vertical: 'top' | 'bottom' | 'center'
  horizontal: 'left' | 'right' | 'center'
}

interface ProfileDropdownProps {
  anchorEl: null | Element
  onClose?: () => void
  open?: boolean
  anchorOrigin?: Origin
  transformOrigin?: Origin
}

export const ProfileIconDropdown: FC<ProfileDropdownProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props

  const router = useRouter()
  const theme = useTheme()
  const { checkSession } = useAuth()
  const { t } = useTranslation()

  const handleSignOut = useCallback(async (): Promise<void> => {
    onClose && onClose() // close the profile dropdown
    await signOut() // sign out the user with supabase
    await checkSession() // refresh the auth state to reflect the user being signed out
  }, [checkSession, onClose])

  return (
    <>
      <Menu
        id="settings-menu"
        component="div"
        anchorEl={anchorEl}
        open={!!open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
          sx: {
            p: 0,
          },
        }}
        anchorOrigin={props.anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        transformOrigin={props.transformOrigin || { vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiMenu-list': {
            width: 280,
          },

          '& .MuiMenuItem-root': {
            borderRadius: theme.shape.borderRadius,
            pr: theme.spacing(0.5),
            mx: theme.spacing(1),

            '& .MuiSvgIcon-root': {
              opacity: 0.5,
            },

            '&.Mui-selected, &.Mui-selected:hover, &:hover, &.MuiButtonBase-root:active': {
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.dark,

              '& .MuiSvgIcon-root': {
                opacity: 0.8,
              },
            },
          },
        }}
        {...other}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : neutral[25],
            p: 1.5,
            overflow: 'hidden',
          }}
        >
          <AvatarTitleDescriptionAlternate />
        </Box>
        <Divider sx={{ mb: 1 }} />

        {/* Profile Icon Dropdown Profile Links */}
        {profile_icon_dropdown_nav_items.map((item) => (
          <MenuItem
            component="div"
            selected={item.title === 'Email Notifications'}
            key={item.title}
            onClick={() => router.push(item.route!)}
            sx={{
              '&:hover .MuiListItemText-primary': {
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
              },
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
              }}
              primary={t(item.title)}
            />
            {item.icon}
          </MenuItem>
        ))}
        <Divider />
        <Box m={1}>
          <Button color="secondary" fullWidth onClick={handleSignOut}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t('Sign Out')}
          </Button>
        </Box>
      </Menu>
    </>
  )
}

ProfileIconDropdown.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
