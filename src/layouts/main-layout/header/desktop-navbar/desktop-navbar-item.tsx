"use client"

import { useRef, useState } from "react"

import { usePathname, useRouter } from "next/navigation"

import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"
import { alpha, Box, Button, Paper, Popper } from "@mui/material"

import { NavBarItem } from "src/models/navbar-item"

const isRouteActive = (route?: string, currentPath?: string, subMenu?: NavBarItem[]): boolean | undefined => {
  if (route && route === currentPath) return true
  return subMenu?.some((item) => item.route && isRouteActive(item.route, currentPath, item.subMenu))
}

type DesktopNavBarItemProps = {
  navbarItem: NavBarItem
  isSub?: boolean
}

export default function DesktopNavBarItem({ navbarItem, isSub }: DesktopNavBarItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const anchorRef = useRef(null)
  const isActive = navbarItem.route ? isRouteActive(navbarItem.route, pathname, navbarItem.subMenu) : false
  const placement = isSub && navbarItem.subMenu ? "right-start" : "bottom-start"

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

  const getBorderRadius = () => {
    if (isSub && navbarItem.subMenu) return 6
    if (navbarItem.subMenu) return 0
    return 6
  }

  return (
    <Box
      position="relative"
      zIndex={2}
      sx={{
        "&:hover": {
          zIndex: 3,

          "& > .MuiButton-root": {
            borderBottomLeftRadius: getBorderRadius(),
            borderBottomRightRadius: getBorderRadius(),
            zIndex: 13,
          },
        },
      }}
      {...commonProps}
      ref={anchorRef}
    >
      {isSub ? (
        <Button
          startIcon={navbarItem.icon ? navbarItem.icon : null}
          fullWidth
          endIcon={navbarItem.subMenu ? <ChevronRightTwoToneIcon fontSize="small" /> : null}
          onClick={() => navbarItem.route && router.push(navbarItem.route)}
          sx={{
            justifyContent: "space-between",
            fontWeight: 600,
            my: "1px",
            fontSize: 14,
            ":hover": {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
            ":active": {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },

            color: (theme) => (theme.palette.mode === "dark" ? theme.palette.neutral[300] : theme.palette.neutral[800]),
            backgroundColor: "transparent",
          }}
        >
          {navbarItem.title}
        </Button>
      ) : (
        <Button
          endIcon={navbarItem.subMenu ? <ExpandMoreTwoToneIcon fontSize="small" /> : null}
          startIcon={navbarItem.icon ? navbarItem.icon : null}
          onClick={() => navbarItem.route && router.push(navbarItem.route)}
          {...commonProps}
          sx={{
            p: (theme) => theme.spacing(0.9, 1.5, 0.9, 1.8),
            fontSize: 14,
            borderRadius: "6px",
            mr: 1.5,
            fontWeight: 500,
            backgroundColor: (theme) => {
              if (isHovered) return theme.palette.background.paper
              if (isActive) return theme.palette.mode === "dark" ? "background.default" : "transparent"
              return "transparent"
            },
            color: (theme) => {
              // Determine if the item is either hovered or active
              if (isHovered || isActive)
                // Since both conditions for dark and light mode return the same value,
                // you can directly return without checking the theme.palette.mode
                return theme.palette.secondary.dark

              // For non-hovered and non-active items, choose color based on the theme mode
              return theme.palette.mode === "dark"
                ? theme.palette.neutral[400] // Dark mode text color
                : theme.palette.neutral[900] // Light mode text color
            },
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? theme.palette.neutral[900] : theme.palette.neutral[300],
            },
          }}
        >
          {navbarItem.title ? navbarItem.title : null}
        </Button>
      )}
      {navbarItem.subMenu && (
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
              borderRadius: "6px",
              borderTopLeftRadius: getBorderRadius(),
              minWidth: "max-content",
              backgroundColor: "background.paper",
              maxWidth: 400,
              mt: "-1px",
              p: 2,
            }}
          >
            {navbarItem.subMenu.map((subItem) => (
              <DesktopNavBarItem key={subItem.title} navbarItem={subItem} isSub />
            ))}
          </Paper>
        </Popper>
      )}
    </Box>
  )
}
