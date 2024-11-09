import type { ListProps, Theme } from "@mui/material"
import type { NavBarItem } from "src/types/navbar-item"

import { Box, List, ListSubheader, styled, useMediaQuery } from "@mui/material"

import Scrollbar from "src/components/base/scrollbar"

import Logo from "src/layouts/main-layout/header/navbar-icons/logo/logo"
import { neutral } from "src/theme/theme"
import { SIDEBAR_WIDTH } from "src/theme/utils"

import MobileNavBarNavItem from "./mobile-navbar-nav-item"

const MobileSidebarWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.mode === "dark" ? neutral[900] : neutral[100],
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "auto",
}))

type MobileNavBarProps = {
    navbarItems?: NavBarItem[]
}

const ListSubheaderWrapper = styled(ListSubheader)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    background: theme.palette.mode === "dark" ? neutral[900] : neutral[100],
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    fontSize: 13,
    fontWeight: 500,
    lineHeight: theme.spacing(5),
    padding: theme.spacing(0, 2),
    textTransform: "uppercase",
}))

export default function MobileNavBar({ navbarItems }: MobileNavBarProps) {
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    if (!navbarItems) return null

    return (
        <MobileSidebarWrapper
            component="nav"
            role="navigation"
            sx={{
                width: SIDEBAR_WIDTH,
            }}
        >
            <Box alignItems="center" display="flex" justifyContent={{ lg: "space-between", xs: "flex-start" }} p={2}>
                <Logo />
            </Box>

            <Box>
                <Box flex={1} overflow="auto" position="relative" zIndex={6}>
                    <Scrollbar dark>
                        {navbarItems.map((navbarItem) => (
                            <Box key={navbarItem.title}>
                                <List
                                    component="nav"
                                    subheader={
                                        <ListSubheaderWrapper component="div" disableSticky={!mdUp}>
                                            {navbarItem.title}
                                        </ListSubheaderWrapper>
                                    }
                                >
                                    {navbarItem.subMenu?.map((subItem) => (
                                        <MobileNavBarNavItem item={subItem} key={subItem.title} />
                                    ))}
                                </List>
                            </Box>
                        ))}
                    </Scrollbar>
                </Box>
            </Box>
        </MobileSidebarWrapper>
    )
}
