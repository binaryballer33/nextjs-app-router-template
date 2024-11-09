import type { Theme } from "@mui/material"
import type { NavBarItem } from "src/types/navbar-item"

import { useState } from "react"

import PropTypes from "prop-types"

import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone"
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"

import { Box, Drawer, IconButton, styled, SwipeableDrawer, Typography, useMediaQuery, useTheme } from "@mui/material"

import { useSession } from "next-auth/react"

import Scrollbar from "src/components/base/scrollbar"

import ActivityTotals from "src/app/(auth)/user/profile/page-components/activity-totals"
import { useSidebarContext } from "src/contexts/sidebar-context"
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_PROFILE_PAGE } from "src/theme/utils"

import SidebarFooter from "./sidebar-footer"
import SidebarNavMenu from "./sidebar-nav-menu"
import SidebarNavMenuCollapsed from "./sidebar-nav-menu-collapsed"
import TenantSwitcher from "./sidebar-tenant-switcher"

const SidebarWrapper = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
}))

type SidebarProps = {
    navbarItems?: NavBarItem[]
    onClose?: () => void
    onOpen?: () => void
    open?: boolean
}

export default function Sidebar(props: SidebarProps) {
    const { navbarItems, onClose, onOpen, open, ...other } = props
    const theme = useTheme()
    const lgUp = useMediaQuery((desktopTheme: Theme) => desktopTheme.breakpoints.up("lg"))
    const mdUp = useMediaQuery((tabletTheme: Theme) => tabletTheme.breakpoints.up("md"))
    const { isSidebarCollapsed, isSidebarHovered, toggleSidebarCollapsed, toggleSidebarHover } = useSidebarContext()
    const { data: session } = useSession()

    const sampleTenants = [
        {
            description: "A leading tech consultancy firm.",
            id: 1,
            logo: "/placeholders/logo/adobe.jpg",
            name: "TechSolutions",
        },
        {
            description: "Organic produce suppliers since 1990.",
            id: 2,
            logo: "/placeholders/logo/ibm.jpg",
            name: "GreenGrocers",
        },
        {
            description: "Modern architectural designs and solutions.",
            id: 3,
            logo: "/placeholders/logo/oracle.jpg",
            name: "UrbanArch",
        },
    ]

    const [currentTenant, setCurrentTenant] = useState(sampleTenants[0])
    const handleTenantSwitch = (tenant: any) => setCurrentTenant(tenant)

    const renderSidebarNavMenu = () => {
        if (mdUp && isSidebarCollapsed)
            return isSidebarHovered ? (
                <SidebarNavMenu navbarItems={navbarItems} />
            ) : (
                <SidebarNavMenuCollapsed navbarItems={navbarItems} />
            )

        return <SidebarNavMenu navbarItems={navbarItems} />
    }

    const getSidebarWidthForSidebarWrapper = () => {
        if (mdUp && isSidebarCollapsed) return isSidebarHovered ? SIDEBAR_WIDTH_PROFILE_PAGE : SIDEBAR_WIDTH_COLLAPSED
        return SIDEBAR_WIDTH_PROFILE_PAGE
    }

    const getSidebarWidthForDrawer = () => {
        if (isSidebarCollapsed) return isSidebarHovered ? SIDEBAR_WIDTH_PROFILE_PAGE : SIDEBAR_WIDTH_COLLAPSED
        return SIDEBAR_WIDTH_PROFILE_PAGE
    }

    const getBoxShadow = (boxShadowTheme: Theme) => {
        if (isSidebarCollapsed) return isSidebarHovered ? boxShadowTheme.shadows[24] : boxShadowTheme.shadows[0]
        return boxShadowTheme.shadows[0]
    }

    const getJustifyContent = () => {
        if (mdUp && isSidebarCollapsed) return isSidebarHovered ? "space-between" : "center"
        return "space-between"
    }

    const getDisplay = () => {
        if (mdUp && isSidebarCollapsed) return isSidebarHovered ? "flex" : "none"
        return "flex"
    }

    const sidebarContent = (
        <SidebarWrapper
            component="nav"
            role="navigation"
            sx={{
                "&::after": {
                    bottom: "-95px",
                    content: '""',
                    display: "block",
                    height: "250px",
                    position: "absolute",
                    right: "-85px",
                    width: "280px",
                },
                "&::before": {
                    content: '""',
                    display: "block",
                    height: "250px",
                    left: "-85px",
                    position: "absolute",
                    top: "-95px",
                    width: "280px",
                },
                width: getSidebarWidthForSidebarWrapper(),
            }}
        >
            <Box
                alignItems="center"
                display="flex"
                justifyContent={{ md: getJustifyContent(), xs: "flex-start" }}
                p={2}
            >
                {/* SideBar Header */}
                {(isSidebarCollapsed && isSidebarHovered) || !isSidebarCollapsed ? (
                    <Typography color="primary" variant="h6">
                        Welcome {session?.user?.email?.slice(0, session?.user?.email?.indexOf("@"))}
                    </Typography>
                ) : null}

                {/* Show Arrow IconButton */}
                {lgUp && (
                    <IconButton
                        onClick={toggleSidebarCollapsed}
                        size="small"
                        sx={{
                            "&:hover": {
                                background: theme.palette.action.hover,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary,
                            },

                            borderColor: theme.palette.divider,
                            borderStyle: "solid",
                            borderWidth: 1,
                            color: theme.palette.text.secondary,
                            display: getDisplay(),
                            textAlign: "left",
                        }}
                    >
                        {isSidebarCollapsed ? (
                            <KeyboardArrowRightTwoToneIcon fontSize="small" />
                        ) : (
                            <KeyboardArrowLeftTwoToneIcon fontSize="small" />
                        )}
                    </IconButton>
                )}
            </Box>

            {/* Sidebar Content Area */}
            <Box flex={1} overflow="auto" position="relative" zIndex={6}>
                <Scrollbar dark>
                    {/* Render Appropriate Sidebar */}
                    {renderSidebarNavMenu()}

                    {/*
              Show if medium screen and up with sidebar not collapsed
              also show if medium screen and up with the sidebar collapsed and you hover,
          */}
                    {mdUp && (!isSidebarCollapsed || (isSidebarCollapsed && isSidebarHovered)) && (
                        <>
                            {/* Item Switcher */}
                            <TenantSwitcher
                                currentTenant={currentTenant}
                                isHovered={isSidebarHovered}
                                onSwitch={handleTenantSwitch}
                                sidebarCollapsed={isSidebarCollapsed}
                                tenants={sampleTenants}
                            />

                            {/* Activity Totals */}
                            <ActivityTotals />
                        </>
                    )}
                </Scrollbar>
            </Box>
            {mdUp && isSidebarCollapsed ? isSidebarHovered && <SidebarFooter /> : <SidebarFooter />}
        </SidebarWrapper>
    )

    // Show Sidebar On Large Screens
    if (lgUp)
        return (
            <Drawer
                anchor="left"
                ModalProps={{ keepMounted: true }}
                onMouseEnter={() => toggleSidebarHover(true)}
                onMouseLeave={() => toggleSidebarHover(false)}
                open
                PaperProps={{
                    // @ts-ignore
                    sx: {
                        backgroundColor: theme.palette.background.default,
                        border: 0,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        boxShadow: (boxShadowTheme) => getBoxShadow(boxShadowTheme),
                        height: "100dvh",
                        left: "24px !important",
                        overflow: "scroll",
                        position: isSidebarCollapsed ? "sticky" : "sticky",
                        top: "90px !important", // places the sidebar below the header

                        transition: (transitionTheme) => transitionTheme.transitions.create(["width", "box-shadow"]),
                        width: getSidebarWidthForDrawer(),
                        zIndex: 5,
                    },
                }}
                variant="persistent"
                {...other}
            >
                {sidebarContent}
            </Drawer>
        )

    return (
        <SwipeableDrawer
            anchor="left"
            ModalProps={{
                keepMounted: true,
            }}
            onClose={onClose || (() => {})}
            onOpen={onOpen || (() => {})}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.background.default,
                    boxShadow: (boxShadowTheme) => boxShadowTheme.shadows[24],
                    overflow: "hidden",
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
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
}
