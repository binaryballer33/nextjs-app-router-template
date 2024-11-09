import type { ListProps } from "@mui/material"
import type { NavBarItem } from "src/types/navbar-item"

import { usePathname } from "next/navigation"

import { useState } from "react"

import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"

import { alpha, Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"

import RouterLink from "src/components/base/router-link"

import { neutral } from "src/theme/theme"

type NavBarItemProps = {
    item: NavBarItem
}

const SubMenu = styled(List)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    "& .MuiListItemButton-root": {
        "& .MuiListItemText-root": {
            margin: 0,
        },
        "&::before": {
            background: neutral[100],
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

export const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
    "& .MuiListItemIcon-root": {
        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        minWidth: 44,
    },
    "& .MuiListItemText-root": {
        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    },
    "&:hover": {
        "& .MuiListItemIcon-root": {
            color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        },
        "& .MuiListItemText-root": {
            color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        },
        background: alpha(neutral[700], 0.08),

        borderColor: alpha(neutral[600], 0.08),

        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        "& .MuiListItemIcon-root": {
            color: neutral[50],
        },
        "& .MuiListItemText-root": {
            color: neutral[50],
        },
        background: alpha(neutral[500], 0.1),

        borderColor: alpha(neutral[700], 0.15),

        color: neutral[50],
    },
    borderColor: "transparent",
    borderRadius: theme.shape.borderRadius,
    borderStyle: "solid",
    borderWidth: 1,
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    fontSize: 14,

    fontWeight: 600,

    marginBottom: "2px",

    padding: theme.spacing(0.8, 1, 0.8, 2),

    transition: "none",
}))

export default function MobileNavBarNavItem({ item }: NavBarItemProps) {
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
                            <MobileNavBarNavItem item={subItem} key={subItem.title} />
                        ))}
                    </SubMenu>
                </Collapse>
            )}
        </Box>
    )
}
