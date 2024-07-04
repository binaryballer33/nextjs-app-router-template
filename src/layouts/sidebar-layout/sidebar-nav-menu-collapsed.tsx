import { Box, List, ListItemIcon } from "@mui/material"
import { usePathname } from "next/navigation"
import { useState } from "react"
import RouterLink from "src/components/base/router-link"
import { NavBarItem } from "src/models/navbar-item"
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
        sx={{
          pl: 1.7,
          mb: 0.5,
        }}
        selected={isActive || isSubMenuActive}
        onClick={handleToggle}
        // @ts-ignore
        component={route ? RouterLink : "a"}
        href={route || undefined}
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
            {navbarItem.subMenu?.map((subItem) => <NavItem key={subItem.title} item={subItem} />)}
          </List>
        </div>
      ))}
    </Box>
  )
}
