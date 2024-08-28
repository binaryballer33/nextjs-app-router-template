import { Box, Stack } from "@mui/material"

import type { NavBarItem } from "src/models/navbar-item"

import DesktopNavBarItem from "./desktop-navbar-item"

type DesktopNavBarProps = {
    navbarItems?: NavBarItem[]
}

export default function DesktopNavBar({ navbarItems }: DesktopNavBarProps) {
    if (!navbarItems) return null

    return (
        <Box position="relative">
            <Stack spacing={0} alignItems="center" flexDirection="row" position="sticky" top={0}>
                {navbarItems.map((item) => (
                    <DesktopNavBarItem key={item.title} navbarItem={item} />
                ))}
            </Stack>
        </Box>
    )
}
