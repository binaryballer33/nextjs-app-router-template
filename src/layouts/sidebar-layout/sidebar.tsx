import { useState } from "react"

import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone"
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"
import type { Theme } from "@mui/material"
import { Box, Drawer, IconButton, styled, SwipeableDrawer, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import PropTypes from "prop-types"

import ActivityTotals from "src/app/(auth)/user/profile/page-components/activity-totals"
import Scrollbar from "src/components/base/scrollbar"
import { useSidebarContext } from "src/contexts/sidebar-context"
import type { NavBarItem } from "src/models/navbar-item"
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_PROFILE_PAGE } from "src/theme/utils"

import SidebarFooter from "./sidebar-footer"
import SidebarNavMenu from "./sidebar-nav-menu"
import SidebarNavMenuCollapsed from "./sidebar-nav-menu-collapsed"
import TenantSwitcher from "./sidebar-tenant-switcher"

const SidebarWrapper = styled(Box)(({ theme }) => ({
    height: "100dvh",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
}))

type SidebarProps = {
    onClose?: () => void
    onOpen?: () => void
    open?: boolean
    navbarItems?: NavBarItem[]
}

export default function Sidebar(props: SidebarProps) {
    const { onClose, onOpen, navbarItems, open, ...other } = props
    const theme = useTheme()
    const lgUp = useMediaQuery((desktopTheme: Theme) => desktopTheme.breakpoints.up("lg"))
    const mdUp = useMediaQuery((tabletTheme: Theme) => tabletTheme.breakpoints.up("md"))
    const { isSidebarCollapsed, isSidebarHovered, toggleSidebarCollapsed, toggleSidebarHover } = useSidebarContext()
    const { data: session } = useSession()

    const sampleTenants = [
        {
            id: 1,
            name: "TechSolutions",
            logo: "/placeholders/logo/adobe.jpg",
            description: "A leading tech consultancy firm.",
        },
        {
            id: 2,
            name: "GreenGrocers",
            logo: "/placeholders/logo/ibm.jpg",
            description: "Organic produce suppliers since 1990.",
        },
        {
            id: 3,
            name: "UrbanArch",
            logo: "/placeholders/logo/oracle.jpg",
            description: "Modern architectural designs and solutions.",
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
                width: getSidebarWidthForSidebarWrapper(),
                "&::before": {
                    content: '""',
                    width: "280px",
                    height: "250px",
                    position: "absolute",
                    top: "-95px",
                    left: "-85px",
                    display: "block",
                },
                "&::after": {
                    content: '""',
                    width: "280px",
                    height: "250px",
                    position: "absolute",
                    bottom: "-95px",
                    right: "-85px",
                    display: "block",
                },
            }}
        >
            <Box
                p={2}
                display="flex"
                justifyContent={{
                    xs: "flex-start",
                    md: getJustifyContent(),
                }}
                alignItems="center"
            >
                {/* SideBar Header */}
                {(isSidebarCollapsed && isSidebarHovered) || !isSidebarCollapsed ? (
                    <Typography variant="h6" color="primary">
                        Welcome {session?.user?.email?.slice(0, session?.user?.email?.indexOf("@"))}
                    </Typography>
                ) : null}

                {/* Show Arrow IconButton */}
                {lgUp && (
                    <IconButton
                        sx={{
                            display: getDisplay(),

                            color: theme.palette.text.secondary,
                            textAlign: "left",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: theme.palette.divider,

                            "&:hover": {
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

            {/* Sidebar Content Area */}
            <Box flex={1} overflow="auto" position="relative" zIndex={6}>
                <Scrollbar dark>
                    {/* Render Approriate Sidebar */}
                    {renderSidebarNavMenu()}

                    {/*
              Show if medium screen and up with sidebar not collasped
              also show if medium screen and up with the sidebar collasped and you hover,
          */}
                    {mdUp && (!isSidebarCollapsed || (isSidebarCollapsed && isSidebarHovered)) && (
                        <>
                            {/* Item Switcher */}
                            <TenantSwitcher
                                sidebarCollapsed={isSidebarCollapsed}
                                isHovered={isSidebarHovered}
                                tenants={sampleTenants}
                                currentTenant={currentTenant}
                                onSwitch={handleTenantSwitch}
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
                open
                ModalProps={{ keepMounted: true }}
                onMouseEnter={() => toggleSidebarHover(true)}
                onMouseLeave={() => toggleSidebarHover(false)}
                PaperProps={{
                    // @ts-ignore
                    sx: {
                        overflow: "scroll",
                        border: 0,
                        top: "90px !important", // places the sidebar below the header
                        left: "24px !important",
                        zIndex: 5,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.default,
                        width: getSidebarWidthForDrawer(),
                        boxShadow: (boxShadowTheme) => getBoxShadow(boxShadowTheme),

                        position: isSidebarCollapsed ? "sticky" : "sticky",
                        height: "100dvh",
                        transition: (transitionTheme) => transitionTheme.transitions.create(["width", "box-shadow"]),
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
            onClose={onClose || (() => {})}
            onOpen={onOpen || (() => {})}
            open={open}
            ModalProps={{
                keepMounted: true,
            }}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.background.default,
                    overflow: "hidden",
                    boxShadow: (boxShadowTheme) => boxShadowTheme.shadows[24],
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
}
