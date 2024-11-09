"use client"

import { useRouter } from "next/navigation"

import { useCallback } from "react"

import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone"

import { alpha, Box, Button, Divider, ListItemText, Menu, MenuItem, useTheme } from "@mui/material"

import handleServerResponse from "src/utils/helper-functions/handleServerResponse"

import signOut from "src/actions/auth/sign-out"

import profileIconDropdownNavItems from "src/routes/profile-dropdown-icon-routes"
import routes from "src/routes/routes"

import { neutral } from "src/theme/theme"

import AvatarTitleDescriptionAlternate from "./profile-icon-avatar-title-description"

type Origin = {
    horizontal: "center" | "left" | "right"
    vertical: "bottom" | "center" | "top"
}

type ProfileDropdownProps = {
    anchorEl: Element | null
    anchorOrigin?: Origin
    onClose: () => void
    open?: boolean
    transformOrigin?: Origin
}

// TODO: maybe I need useSession here, maybe I don't
// TODO: on mobile phones turn this dropdown into a bottom mobile navigation bar
export default function ProfileIconDropdown(props: ProfileDropdownProps) {
    const { anchorEl, anchorOrigin, onClose, open, transformOrigin, ...other } = props

    const router = useRouter()
    const theme = useTheme()
    const { t } = useTranslation()

    const handleSignOut = useCallback(async (): Promise<void> => {
        onClose() // close the profile dropdown
        const response = await signOut() // sign out the user with next auth
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [onClose])

    const handleNavItemClick = (route: string): void => {
        onClose()
        router.push(route)
    }

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin || { horizontal: "right", vertical: "top" }}
            component="div"
            id="settings-menu"
            MenuListProps={{
                "aria-labelledby": "settings-button",
                sx: {
                    p: 0,
                },
            }}
            onClose={onClose}
            open={!!open}
            sx={{
                "& .MuiMenu-list": {
                    width: 280,
                },

                "& .MuiMenuItem-root": {
                    "& .MuiSvgIcon-root": {
                        opacity: 0.5,
                    },
                    "&.Mui-selected, &.Mui-selected:hover, &:hover, &.MuiButtonBase-root:active": {
                        "& .MuiSvgIcon-root": {
                            opacity: 0.8,
                        },
                        background: alpha(theme.palette.primary.main, 0.1),

                        color: theme.palette.primary.dark,
                    },
                    borderRadius: theme.shape.borderRadius,

                    mx: theme.spacing(1),

                    pr: theme.spacing(0.5),
                },
            }}
            transformOrigin={transformOrigin || { horizontal: "right", vertical: "top" }}
            {...other}
        >
            <Box
                sx={{
                    backgroundColor: (bgColortheme) =>
                        bgColortheme.palette.mode === "dark"
                            ? alpha(bgColortheme.palette.neutral[25], 0.02)
                            : neutral[25],
                    overflow: "hidden",
                    p: 1.5,
                }}
            >
                <AvatarTitleDescriptionAlternate />
            </Box>
            <Divider sx={{ mb: 1 }} />

            {/* Profile Icon Dropdown Profile Links */}
            {profileIconDropdownNavItems.map((item) => (
                <MenuItem
                    component="div"
                    key={item.title}
                    onClick={() => handleNavItemClick(item.route!)}
                    selected={item.title === "Email Notifications"}
                    sx={{
                        "&:hover .MuiListItemText-primary": {
                            color: theme.palette.mode === "dark" ? "text.primary" : "primary.main",
                        },
                    }}
                >
                    <ListItemText
                        primary={t(item.title)}
                        primaryTypographyProps={{
                            fontWeight: 500,
                        }}
                    />
                    {item.icon}
                </MenuItem>
            ))}
            <Divider />

            {/* Sign Out Link */}
            <Box m={1}>
                <Button color="secondary" fullWidth onClick={handleSignOut}>
                    <LockOpenTwoToneIcon
                        sx={{
                            mr: 1,
                        }}
                    />
                    {t("Sign Out")}
                </Button>
            </Box>
        </Menu>
    )
}
