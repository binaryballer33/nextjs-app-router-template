import AccountBoxIcon from "@mui/icons-material/AccountBox"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ReceiptIcon from "@mui/icons-material/Receipt"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import type { NavBarItem } from "src/models/navbar-item"

import routes from "./routes"

const profileIconDropdownNavItems: NavBarItem[] = [
    { title: "My Profile", icon: <AccountBoxIcon />, route: routes.user.profile },
    { title: "Profile settings", icon: <ManageAccountsIcon />, route: routes.dummy },
    { title: "Cart", icon: <ShoppingCartIcon />, route: routes.dummy },
    { title: "Orders", icon: <ReceiptIcon />, route: routes.dummy },
]

export default profileIconDropdownNavItems
