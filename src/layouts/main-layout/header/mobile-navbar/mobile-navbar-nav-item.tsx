import { useState } from "react"

import { usePathname } from "next/navigation"

import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"
import {
    alpha,
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListProps,
    styled,
} from "@mui/material"

import RouterLink from "src/components/base/router-link"
import { NavBarItem } from "src/models/navbar-item"
import { neutral } from "src/theme/theme"

type NavBarItemProps = {
    item: NavBarItem
}

const SubMenu = styled(List)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
    paddingTop: theme.spacing(0.5),

    "& .MuiListItemButton-root": {
        padding: theme.spacing(0.8, 1, 0.8, 6.5),
        fontWeight: 500,

        "&::before": {
            content: '" "',
            background: neutral[100],
            opacity: 0,
            position: "absolute",
            left: theme.spacing(2.8),
            borderRadius: 4,
            top: "50%",
            height: "6px",
            width: "6px",
            transform: "scale(0)",
            marginTop: "-3px",
            transition: theme.transitions.create(["transform", "opacity"]),
        },

        "&.Mui-selected, &:hover": {
            "&::before": {
                opacity: 1,
                transform: "scale(1)",
            },
        },

        "& .MuiListItemText-root": {
            margin: 0,
        },
    },
}))

export const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    borderRadius: theme.shape.borderRadius,
    transition: "none",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: "2px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    padding: theme.spacing(0.8, 1, 0.8, 2),

    "& .MuiListItemIcon-root": {
        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        minWidth: 44,
    },

    "& .MuiListItemText-root": {
        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
    },

    "&:hover": {
        color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        background: alpha(neutral[700], 0.08),
        borderColor: alpha(neutral[600], 0.08),

        "& .MuiListItemIcon-root": {
            color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        },

        "& .MuiListItemText-root": {
            color: theme.palette.mode === "dark" ? neutral[100] : neutral[900],
        },
    },

    "&.Mui-selected, &.Mui-selected:hover": {
        color: neutral[50],
        background: alpha(neutral[500], 0.1),
        borderColor: alpha(neutral[700], 0.15),

        "& .MuiListItemIcon-root": {
            color: neutral[50],
        },

        "& .MuiListItemText-root": {
            color: neutral[50],
        },
    },
}))

export default function MobileNavBarNavItem({ item }: NavBarItemProps) {
    const { title, icon, route, subMenu } = item
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
                selected={isActive || isSubMenuActive}
                onClick={handleToggle}
                // @ts-ignore
                component={route ? RouterLink : "a"}
                href={route || undefined}
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText disableTypography primary={title} />
                {subMenu && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
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
                    <SubMenu component="div" sx={{ mx: -2 }} disablePadding>
                        {subMenu.map((subItem) => (
                            <MobileNavBarNavItem key={subItem.title} item={subItem} />
                        ))}
                    </SubMenu>
                </Collapse>
            )}
        </Box>
    )
}
