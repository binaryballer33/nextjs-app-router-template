import type { NavBarItem } from "src/types/navbar-item"

import AccountBoxIcon from "@mui/icons-material/AccountBox"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ReceiptIcon from "@mui/icons-material/Receipt"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import routes from "./routes"

const profileIconDropdownNavItems: NavBarItem[] = [
    { icon: <AccountBoxIcon />, route: routes.user.profile, title: "My Profile" },
    { icon: <ManageAccountsIcon />, route: routes.dummy, title: "Profile settings" },
    { icon: <ShoppingCartIcon />, route: routes.dummy, title: "Cart" },
    { icon: <ReceiptIcon />, route: routes.dummy, title: "Orders" },
]

export default profileIconDropdownNavItems
