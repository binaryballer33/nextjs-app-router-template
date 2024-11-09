import type { NavBarItem } from "src/types/navbar-item"

import { Box, Stack } from "@mui/material"

import DesktopNavBarItem from "./desktop-navbar-item"

type DesktopNavBarProps = {
    navbarItems?: NavBarItem[]
}

export default function DesktopNavBar({ navbarItems }: DesktopNavBarProps) {
    if (!navbarItems) return null

    return (
        <Box position="relative">
            <Stack alignItems="center" flexDirection="row" position="sticky" spacing={0} top={0}>
                {navbarItems.map((item) => (
                    <DesktopNavBarItem key={item.title} navbarItem={item} />
                ))}
            </Stack>
        </Box>
    )
}
