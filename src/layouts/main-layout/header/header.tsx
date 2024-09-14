"use client"

import type { Theme } from "@mui/material"

import { useRouter } from "next/navigation"

import LockIcon from "@mui/icons-material/Lock"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"

import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Stack,
    styled,
    SwipeableDrawer,
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material"

import { useSession } from "next-auth/react"

import useDialog from "src/hooks/use-dialog"
import useMobileNav from "src/hooks/use-mobile-nav"
import usePopover from "src/hooks/use-popover"

import { DividerLight } from "src/components/base/styles/card"

import useHorizontalNavBarItems from "src/routes/horizontal-navbar-routes"
import routes from "src/routes/routes"

import { neutral } from "src/theme/theme"

import DesktopNavBar from "./desktop-navbar/desktop-navbar"
import MobileNavBar from "./mobile-navbar/mobile-navbar"
import LanguageDropdown from "./navbar-icons/language-icon/language-icon-dropdown"
import Logo from "./navbar-icons/logo/logo"
import ProfileIconDropdown from "./navbar-icons/profile-icon-dropdown/profile-icon-dropdown-content"
import BasicSpotlightSearch from "./navbar-icons/search-icon/search-icon"
import ThemeModeToggler from "./navbar-icons/theme-mode-toggler/theme-mode-toggler"

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    display: "flex",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "sticky",
    top: 0,
    zIndex: 10,
}))

export default function Header() {
    const router = useRouter()
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"))
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"))
    const theme = useTheme()
    const dialog = useDialog()
    const navbarItems = useHorizontalNavBarItems()
    const popover = usePopover<HTMLButtonElement>()
    const { handleClose, handleOpen, open } = useMobileNav()
    const { data: session } = useSession()
    // TODO: figure out why I need to refresh in order for auth state to update
    // console.log(`useSession called from the Header component: ${JSON.stringify(session, null, 2)}, status: ${status}`)

    return (
        <>
            <HeaderWrapper elevation={0} role="banner">
                <Stack alignItems="center" direction="row" flex={1} justifyContent="space-between" py={3}>
                    {/* Desktop NavBar Section */}
                    <Stack
                        alignItems="center"
                        direction="row"
                        divider={
                            <DividerLight
                                flexItem
                                orientation="vertical"
                                sx={{
                                    alignSelf: "center",
                                    height: 24,
                                }}
                            />
                        }
                        spacing={2}
                    >
                        <Box sx={{ transform: "scale(.86)" }}>
                            <Logo />
                        </Box>

                        {/* Desktop NavBar */}
                        {lgUp && <DesktopNavBar navbarItems={navbarItems} />}
                    </Stack>

                    {/* Header Icons Section */}
                    <Stack
                        alignItems="center"
                        direction="row"
                        divider={
                            <DividerLight
                                flexItem
                                orientation="vertical"
                                sx={{
                                    alignSelf: "center",
                                    height: 24,
                                }}
                            />
                        }
                        spacing={{ sm: 2, xs: 1 }}
                    >
                        {/* Other Header Icons */}
                        <>
                            <Stack alignItems="center" direction="row" display="flex" spacing={1}>
                                {smUp && (
                                    <IconButton
                                        color="inherit"
                                        onClick={dialog.handleOpen}
                                        sx={{
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 22,
                                            },
                                            "&:hover": {
                                                background: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                            },
                                            p: 1,
                                        }}
                                    >
                                        <Tooltip title="Search The Page">
                                            <SearchRoundedIcon />
                                        </Tooltip>
                                    </IconButton>
                                )}
                            </Stack>

                            <LanguageDropdown
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 22,
                                    },
                                    "&:hover": {
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                    },
                                    p: 1,
                                }}
                            />

                            <ThemeModeToggler />
                        </>

                        {/* Login Icon & Profile Icon */}
                        {session?.user ? (
                            <Tooltip title="User">
                                <IconButton
                                    aria-controls={popover.open ? "profile-menu" : undefined}
                                    aria-expanded={popover.open ? "true" : undefined}
                                    aria-haspopup="true"
                                    color="primary"
                                    id="profile-button"
                                    onClick={popover.handleOpen}
                                    ref={popover.anchorRef}
                                    sx={{
                                        "&:hover": {
                                            boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                                        },
                                        p: 0,
                                    }}
                                >
                                    <Avatar
                                        alt="Shaquille Mandy"
                                        src=""
                                        sx={{
                                            borderRadius: "inherit",
                                            height: 36,
                                            width: 36,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Login">
                                <IconButton onClick={() => router.push(routes.auth.login)}>
                                    <LockIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Show Mobile Menu Icon Button */}
                        {!lgUp && (
                            <IconButton
                                color="inherit"
                                onClick={handleOpen}
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 22,
                                    },
                                    "&:hover": {
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                    },
                                    p: 1,
                                }}
                            >
                                <MenuRoundedIcon />
                            </IconButton>
                        )}
                    </Stack>

                    {/* NavBar Dropdowns and Overlays */}
                    <>
                        <BasicSpotlightSearch onClose={dialog.handleClose} open={dialog.open} />

                        <ProfileIconDropdown
                            anchorEl={popover.anchorRef.current}
                            anchorOrigin={{ horizontal: "center", vertical: "top" }}
                            onClose={popover.handleClose}
                            open={popover.open}
                            transformOrigin={{ horizontal: "center", vertical: "top" }}
                        />
                    </>
                </Stack>
            </HeaderWrapper>

            {/* Mobile NavBar Section */}
            {!lgUp && (
                <SwipeableDrawer
                    anchor="left"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    PaperProps={{
                        sx: {
                            backgroundColor: neutral[900],
                            boxShadow: (boxShadowTheme) => boxShadowTheme.shadows[0],
                            overflow: "hidden",
                        },
                    }}
                    variant="temporary"
                >
                    <MobileNavBar navbarItems={navbarItems} />
                </SwipeableDrawer>
            )}
        </>
    )
}
