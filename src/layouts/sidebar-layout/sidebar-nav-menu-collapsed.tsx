import type { NavBarItem } from "src/types/navbar-item"

import { usePathname } from "next/navigation"

import { useState } from "react"

import { Box, List, ListItemIcon } from "@mui/material"

import RouterLink from "src/components/base/router-link"

import { ListItemButtonWrapper } from "./sidebar-nav-menu"

type NavItemProps = {
    item: NavBarItem
}

function NavItem({ item }: NavItemProps) {
    const { icon, route, subMenu } = item
    const pathname = usePathname()
    const isActive = route && pathname.includes(route)
    const isSubMenuActive = subMenu?.some((sub) => sub.route && pathname.includes(sub.route))

    const [open, setOpen] = useState(isSubMenuActive)

    const handleToggle = () => {
        if (subMenu) setOpen(!open)
    }

    return (
        <Box px={2}>
            <ListItemButtonWrapper
                // @ts-ignore
                component={route ? RouterLink : "a"}
                href={route || undefined}
                onClick={handleToggle}
                selected={isActive || isSubMenuActive}
                sx={{
                    mb: 0.5,
                    pl: 1.7,
                }}
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
            </ListItemButtonWrapper>
        </Box>
    )
}

type SidebarNavMenuCollapsedProps = {
    navbarItems?: NavBarItem[]
}

export default function SidebarNavMenuCollapsed({ navbarItems = [] }: SidebarNavMenuCollapsedProps) {
    return (
        <Box>
            {navbarItems.map((navbarItem) => (
                <div key={navbarItem.title}>
                    <List component="nav">
                        {navbarItem.subMenu?.map((subItem) => <NavItem item={subItem} key={subItem.title} />)}
                    </List>
                </div>
            ))}
        </Box>
    )
}
