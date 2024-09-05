"use client"

import { useCallback } from "react"

import { useRouter } from "next/navigation"

import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone"
import { alpha, Box, Button, Divider, ListItemText, Menu, MenuItem, useTheme } from "@mui/material"
import PropTypes from "prop-types"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import signOut from "src/actions/auth/sign-out"
import profileIconDropdownNavItems from "src/router/profile-dropdown-icon-routes"
import routes from "src/router/routes"
import { neutral } from "src/theme/theme"

import AvatarTitleDescriptionAlternate from "./profile-icon-avatar-title-description"

type Origin = {
    vertical: "top" | "bottom" | "center"
    horizontal: "left" | "right" | "center"
}

type ProfileDropdownProps = {
    anchorEl: null | Element
    onClose: () => void
    open?: boolean
    anchorOrigin?: Origin
    transformOrigin?: Origin
}

// TODO: maybe I need useSession here, maybe I don't
// TODO: on mobile phones turn this dropdown into a bottom mobile navigation bar
export default function ProfileIconDropdown(props: ProfileDropdownProps) {
    const { anchorEl, onClose, open, anchorOrigin, transformOrigin, ...other } = props

    const router = useRouter()
    const theme = useTheme()
    const { t } = useTranslation()

    const handleSignOut = useCallback(async (): Promise<void> => {
        try {
            await signOut() // sign out the user with next auth
            toast.success(t("You've Successfully Signed Out"))
            window.location.reload() // force all components to recognize the change in auth status
            router.push(routes.auth.signOut)
        } catch (error) {
            toast.error(t("An Error Occurred While Signing Out"))
            console.error("Error While Signing Out: ", error)
        } finally {
            onClose() // close the profile dropdown
        }
    }, [onClose, router, t])

    const handleNavItemClick = (route: string): void => {
        onClose()
        router.push(route)
    }

    return (
        <Menu
            id="settings-menu"
            component="div"
            anchorEl={anchorEl}
            open={!!open}
            onClose={onClose}
            MenuListProps={{
                "aria-labelledby": "settings-button",
                sx: {
                    p: 0,
                },
            }}
            anchorOrigin={anchorOrigin || { vertical: "top", horizontal: "right" }}
            transformOrigin={transformOrigin || { vertical: "top", horizontal: "right" }}
            sx={{
                "& .MuiMenu-list": {
                    width: 280,
                },

                "& .MuiMenuItem-root": {
                    borderRadius: theme.shape.borderRadius,
                    pr: theme.spacing(0.5),
                    mx: theme.spacing(1),

                    "& .MuiSvgIcon-root": {
                        opacity: 0.5,
                    },

                    "&.Mui-selected, &.Mui-selected:hover, &:hover, &.MuiButtonBase-root:active": {
                        background: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.dark,

                        "& .MuiSvgIcon-root": {
                            opacity: 0.8,
                        },
                    },
                },
            }}
            {...other}
        >
            <Box
                sx={{
                    backgroundColor: (bgColortheme) =>
                        bgColortheme.palette.mode === "dark"
                            ? alpha(bgColortheme.palette.neutral[25], 0.02)
                            : neutral[25],
                    p: 1.5,
                    overflow: "hidden",
                }}
            >
                <AvatarTitleDescriptionAlternate />
            </Box>
            <Divider sx={{ mb: 1 }} />

            {/* Profile Icon Dropdown Profile Links */}
            {profileIconDropdownNavItems.map((item) => (
                <MenuItem
                    component="div"
                    selected={item.title === "Email Notifications"}
                    key={item.title}
                    onClick={() => handleNavItemClick(item.route!)}
                    sx={{
                        "&:hover .MuiListItemText-primary": {
                            color: theme.palette.mode === "dark" ? "text.primary" : "primary.main",
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

ProfileIconDropdown.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}
