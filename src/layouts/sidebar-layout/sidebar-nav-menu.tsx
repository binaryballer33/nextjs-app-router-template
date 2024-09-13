import type { ListProps, Theme } from "@mui/material"
import type { NavBarItem } from "src/types/navbar-item"

import { usePathname } from "next/navigation"

import { useState } from "react"

import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"

import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    styled,
    useMediaQuery,
} from "@mui/material"

import RouterLink from "src/components/base/router-link"

type NavItemProps = {
    item: NavBarItem
}

const ListSubheaderWrapper = styled(ListSubheader)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: theme.spacing(5),
    padding: theme.spacing(0, 2),
    textTransform: "uppercase",
}))

export const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
    "& .MuiListItemIcon-root": {
        color: theme.palette.text.secondary,
        minWidth: 44,
    },
    "& .MuiListItemText-root": {
        color: theme.palette.text.secondary,
    },
    "&:hover": {
        "& .MuiListItemIcon-root": {
            color: theme.palette.text.primary,
        },
        "& .MuiListItemText-root": {
            color: theme.palette.text.primary,
        },
        background: theme.palette.background.paper,

        borderColor: theme.palette.primary.main,

        color: theme.palette.text.primary,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        "& .MuiListItemIcon-root": {
            color: theme.palette.text.primary,
        },
        "& .MuiListItemText-root": {
            color: theme.palette.text.primary,
        },
        background: theme.palette.primary.main,

        borderColor: theme.palette.primary.main,

        color: theme.palette.text.primary,
    },
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
    fontSize: 14,

    fontWeight: 600,

    marginBottom: "2px",

    padding: theme.spacing(0.8, 1, 0.8, 2),

    transition: "none",
}))

const SubMenu = styled(List)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    "& .MuiListItemButton-root": {
        "& .MuiListItemText-root": {
            margin: 0,
        },
        "&::before": {
            background: theme.palette.primary.main,
            borderRadius: 4,
            content: '" "',
            height: "6px",
            left: theme.spacing(2.8),
            marginTop: "-3px",
            opacity: 0,
            position: "absolute",
            top: "50%",
            transform: "scale(0)",
            transition: theme.transitions.create(["transform", "opacity"]),
            width: "6px",
        },

        "&.Mui-selected, &:hover": {
            "&::before": {
                opacity: 1,
                transform: "scale(1)",
            },
        },

        fontWeight: 500,

        padding: theme.spacing(0.8, 1, 0.8, 6.5),
    },

    paddingTop: theme.spacing(0.5),
}))

function NavItem({ item }: NavItemProps) {
    const { icon, route, subMenu, title } = item
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
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText disableTypography primary={title} />
                {subMenu && (
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            transition: (theme) => theme.transitions.create(["transform"]),
                        }}
                    >
                        <KeyboardArrowRightTwoToneIcon fontSize="small" />
                    </Box>
                )}
            </ListItemButtonWrapper>
            {subMenu && (
                <Collapse in={open}>
                    <SubMenu component="div" disablePadding sx={{ mx: -2 }}>
                        {subMenu.map((subItem) => (
                            <NavItem item={subItem} key={subItem.title} />
                        ))}
                    </SubMenu>
                </Collapse>
            )}
        </Box>
    )
}

type SidebarNavMenuProps = {
    navbarItems?: NavBarItem[]
}

export default function SidebarNavMenu({ navbarItems = [] }: SidebarNavMenuProps) {
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))

    return (
        <Box>
            {navbarItems.map((navbarItem) => (
                <div key={navbarItem.title}>
                    <List
                        component="nav"
                        subheader={
                            <ListSubheaderWrapper component="div" disableSticky={!mdUp}>
                                {navbarItem.title}
                            </ListSubheaderWrapper>
                        }
                    >
                        {navbarItem.subMenu?.map((subItem) => <NavItem item={subItem} key={subItem.title} />)}
                    </List>
                </div>
            ))}
        </Box>
    )
}
