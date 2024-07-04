import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  ListSubheader,
  styled,
  Theme,
  useMediaQuery,
} from "@mui/material"
import { usePathname } from "next/navigation"
import PropTypes from "prop-types"
import { useState } from "react"
import RouterLink from "src/components/base/router-link"
import { NavBarItem } from "src/models/navbar-item"

type NavItemProps = {
  item: NavBarItem
}

const ListSubheaderWrapper = styled(ListSubheader)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
  background: theme.palette.background.default,
  textTransform: "uppercase",
  fontWeight: 500,
  fontSize: 13,
  color: theme.palette.text.secondary,
  lineHeight: theme.spacing(5),
  padding: theme.spacing(0, 2),
}))

export const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  transition: "none",
  fontWeight: 600,
  fontSize: 14,
  marginBottom: "2px",
  padding: theme.spacing(0.8, 1, 0.8, 2),

  "& .MuiListItemIcon-root": {
    color: theme.palette.text.secondary,
    minWidth: 44,
  },

  "& .MuiListItemText-root": {
    color: theme.palette.text.secondary,
  },

  "&:hover": {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,

    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    },

    "& .MuiListItemText-root": {
      color: theme.palette.text.primary,
    },
  },

  "&.Mui-selected, &.Mui-selected:hover": {
    color: theme.palette.text.primary,
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,

    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    },

    "& .MuiListItemText-root": {
      color: theme.palette.text.primary,
    },
  },
}))

const SubMenu = styled(List)<ListProps<"div", { component: "div" }>>(({ theme }) => ({
  paddingTop: theme.spacing(0.5),

  "& .MuiListItemButton-root": {
    padding: theme.spacing(0.8, 1, 0.8, 6.5),
    fontWeight: 500,

    "&::before": {
      content: '" "',
      background: theme.palette.primary.main,
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

function NavItem({ item }: NavItemProps) {
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
              <NavItem key={subItem.title} item={subItem} />
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
            {navbarItem.subMenu?.map((subItem) => <NavItem key={subItem.title} item={subItem} />)}
          </List>
        </div>
      ))}
    </Box>
  )
}

SidebarNavMenu.propTypes = {
  navbarItems: PropTypes.array,
}
