import type { NavBarItem } from "@/types/navbar-item"

import { Receipt, ShoppingCart, User, UserCog } from "lucide-react"

import routes from "./routes"

const profileIconDropdownNavItems: NavBarItem[] = [
    {
        icon: <User className="h-5 w-5" />,
        route: routes.user.profile,
        title: "My Profile",
    },
    {
        icon: <UserCog className="h-5 w-5" />,
        route: routes.dummy,
        title: "Profile settings",
    },
    {
        icon: <ShoppingCart className="h-5 w-5" />,
        route: routes.dummy,
        title: "Cart",
    },
    {
        icon: <Receipt className="h-5 w-5" />,
        route: routes.dummy,
        title: "Orders",
    },
]

export default profileIconDropdownNavItems
