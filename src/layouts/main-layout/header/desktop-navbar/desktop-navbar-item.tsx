'use client'

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import { alpha, Box, Button, Paper, Popper } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC, useRef, useState } from 'react'
import { NavBarItem } from 'src/models/navbar-item'

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

type DesktopNavBarItemProps = {
  item: NavBarItem
  isSub?: boolean
}

export const DesktopNavBarItem: FC<DesktopNavBarItemProps> = ({ item: navbar_item, isSub }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const anchorRef = useRef(null)
  const isActive = navbar_item.route ? isRouteActive(navbar_item.route, pathname, navbar_item.subMenu) : false
  const placement = isSub && navbar_item.subMenu ? 'right-start' : navbar_item.subMenu ? 'bottom-start' : 'bottom-start'

  const commonProps = {
    onMouseEnter: () => {
      setMenuOpen(true)
      setIsHovered(true)
    },

    onMouseLeave: () => {
      setMenuOpen(false)
      setIsHovered(false)
    },
  }

  return (
    <Box
      position="relative"
      zIndex={2}
      sx={{
        '&:hover': {
          zIndex: 3,

          '& > .MuiButton-root': {
            borderBottomLeftRadius: isSub && navbar_item.subMenu ? 6 : navbar_item.subMenu ? 0 : 6,
            borderBottomRightRadius: isSub && navbar_item.subMenu ? 6 : navbar_item.subMenu ? 0 : 6,
            zIndex: 13,
          },
        },
      }}
      {...commonProps}
      ref={anchorRef}
    >
      {isSub ? (
        <Button
          startIcon={navbar_item.icon ? navbar_item.icon : null}
          fullWidth
          endIcon={navbar_item.subMenu ? <ChevronRightTwoToneIcon fontSize="small" /> : null}
          onClick={() => navbar_item.route && router.push(navbar_item.route)}
          sx={{
            justifyContent: 'space-between',
            fontWeight: 600,
            my: '1px',
            fontSize: 14,
            ':hover': {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
            ':active': {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },

            color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.neutral[300] : theme.palette.neutral[800]),
            backgroundColor: 'transparent',
          }}
        >
          {navbar_item.title}
        </Button>
      ) : (
        <Button
          endIcon={navbar_item.subMenu ? <ExpandMoreTwoToneIcon fontSize="small" /> : null}
          startIcon={navbar_item.icon ? navbar_item.icon : null}
          onClick={() => navbar_item.route && router.push(navbar_item.route)}
          {...commonProps}
          sx={{
            p: (theme) => theme.spacing(0.9, 1.5, 0.9, 1.8),
            fontSize: 14,
            borderRadius: '6px',
            mr: 1.5,
            fontWeight: 500,
            backgroundColor: (theme) =>
              isHovered
                ? theme.palette.mode === 'dark'
                  ? theme.palette.background.paper
                  : theme.palette.background.paper
                : isActive
                  ? theme.palette.mode === 'dark'
                    ? 'background.default'
                    : 'transparent'
                  : 'transparent',
            color: (theme) =>
              isHovered || isActive
                ? theme.palette.mode === 'dark' // Default Colors below are for hovered and active items
                  ? theme.palette.secondary.dark // Dark mode text color for hovered and active items
                  : theme.palette.secondary.dark // Light mode text color for hovered and active items
                : theme.palette.mode === 'dark' // Default Colors below are for non-hovered and non-active items
                  ? theme.palette.neutral[400] // Dark mode text color for non-hovered and non-active items
                  : theme.palette.neutral[900], // Light mode text color for non-hovered and non-active items
            '&:hover': {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.neutral[900] : theme.palette.neutral[300],
            },
          }}
        >
          {navbar_item.title ? navbar_item.title : null}
        </Button>
      )}
      {navbar_item.subMenu && (
        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement={placement}
          disablePortal
          sx={{ zIndex: 12, borderRadius: 6 }}
        >
          <Paper
            {...commonProps}
            elevation={23}
            sx={{
              borderRadius: '6px',
              borderTopLeftRadius: isSub && navbar_item.subMenu ? 6 : navbar_item.subMenu ? 0 : 6,
              minWidth: 240,
              backgroundColor: 'background.paper',
              maxWidth: 320,
              mt: '-1px',
              p: 2,
            }}
          >
            {navbar_item.subMenu.map((subItem, index) => (
              <DesktopNavBarItem key={index} item={subItem} isSub />
            ))}
          </Paper>
        </Popper>
      )}
    </Box>
  )
}
