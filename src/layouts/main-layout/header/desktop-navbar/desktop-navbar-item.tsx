"use client"

import type { NavBarItem } from "src/types/navbar-item"

import { usePathname, useRouter } from "next/navigation"

import { useRef, useState } from "react"

import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"

import { alpha, Box, Button, Paper, Popper } from "@mui/material"

const isRouteActive = (route?: string, currentPath?: string, subMenu?: NavBarItem[]): boolean | undefined => {
    if (route && route === currentPath) return true
    return subMenu?.some((item) => item.route && isRouteActive(item.route, currentPath, item.subMenu))
}

type DesktopNavBarItemProps = {
    isSub?: boolean
    navbarItem: NavBarItem
}

export default function DesktopNavBarItem({ isSub, navbarItem }: DesktopNavBarItemProps) {
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
            sx={{
                "&:hover": {
                    "& > .MuiButton-root": {
                        borderBottomLeftRadius: getBorderRadius(),
                        borderBottomRightRadius: getBorderRadius(),
                        zIndex: 13,
                    },

                    zIndex: 3,
                },
            }}
            zIndex={2}
            {...commonProps}
            ref={anchorRef}
        >
            {isSub ? (
                <Button
                    endIcon={navbarItem.subMenu ? <ChevronRightTwoToneIcon fontSize="small" /> : null}
                    fullWidth
                    onClick={() => navbarItem.route && router.push(navbarItem.route)}
                    startIcon={navbarItem.icon ? navbarItem.icon : null}
                    sx={{
                        ":active": {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: (theme) => theme.palette.primary.main,
                        },
                        ":hover": {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            color: (theme) => theme.palette.primary.main,
                        },
                        backgroundColor: "transparent",
                        color: (theme) =>
                            theme.palette.mode === "dark" ? theme.palette.neutral[300] : theme.palette.neutral[800],
                        fontSize: 14,
                        fontWeight: 600,

                        justifyContent: "space-between",
                        my: "1px",
                    }}
                >
                    {navbarItem.title}
                </Button>
            ) : (
                <Button
                    endIcon={navbarItem.subMenu ? <ExpandMoreTwoToneIcon fontSize="small" /> : null}
                    onClick={() => navbarItem.route && router.push(navbarItem.route)}
                    startIcon={navbarItem.icon ? navbarItem.icon : null}
                    {...commonProps}
                    sx={{
                        "&:hover": {
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? theme.palette.neutral[900] : theme.palette.neutral[300],
                            color: (theme) => theme.palette.primary.main,
                        },
                        backgroundColor: (theme) => {
                            if (isHovered) return theme.palette.background.paper
                            if (isActive) return theme.palette.mode === "dark" ? "background.default" : "transparent"
                            return "transparent"
                        },
                        borderRadius: "6px",
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
                        fontSize: 14,
                        fontWeight: 500,
                        mr: 1.5,
                        p: (theme) => theme.spacing(0.9, 1.5, 0.9, 1.8),
                    }}
                >
                    {navbarItem.title ? navbarItem.title : null}
                </Button>
            )}
            {navbarItem.subMenu && (
                <Popper
                    anchorEl={anchorRef.current}
                    disablePortal
                    open={menuOpen}
                    placement={placement}
                    sx={{ borderRadius: 6, zIndex: 12 }}
                >
                    <Paper
                        {...commonProps}
                        elevation={23}
                        sx={{
                            backgroundColor: "background.paper",
                            borderRadius: "6px",
                            borderTopLeftRadius: getBorderRadius(),
                            maxWidth: 400,
                            minWidth: "max-content",
                            mt: "-1px",
                            p: 2,
                        }}
                    >
                        {navbarItem.subMenu.map((subItem) => (
                            <DesktopNavBarItem isSub key={subItem.title} navbarItem={subItem} />
                        ))}
                    </Paper>
                </Popper>
            )}
        </Box>
    )
}
