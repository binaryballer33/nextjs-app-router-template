import type { NavBarItemWithIcon } from "@/types/navbar-item"

import { useTranslation } from "react-i18next"

import {
    HelpCircle,
    Home,
    LogIn,
    MessageCircleWarning,
    Phone,
    Receipt,
    ShoppingCart,
    User,
    UserCog,
    UserPlus,
} from "lucide-react"
import { FaSignOutAlt } from "react-icons/fa"
import { MdLockReset } from "react-icons/md"

import routes from "@/routes/routes"

// dropdown items with translations
export default function useDropdownItems(): NavBarItemWithIcon[] {
    const { t } = useTranslation()

    return [
        {
            icon: Home,
            route: routes.home,
            title: t("Service1"),
        },
        {
            icon: Home,
            route: routes.home,
            title: t("Service 2"),
        },
        {
            icon: Home,
            route: routes.home,
            subMenu: [
                { icon: Home, route: routes.home, separator: true, title: t("Service 3.1") },
                { icon: Home, route: routes.home, title: t("Service 3.2") },
                { icon: Home, route: routes.home, title: t("Service 3.3") },
            ],
            title: t("Service 3"),
        },
    ]
}

// navigation items with translations
export function useNavigationItems(): NavBarItemWithIcon[] {
    const { t } = useTranslation()

    return [
        { icon: Home, route: routes.about, title: t("About") },
        { icon: HelpCircle, route: routes.services, title: t("FAQs") },
        { icon: Phone, route: routes.contact, title: t("Contact") },
    ]
}

// not logged in auth items with translations
export function useNotLoggedInAuthItems(): NavBarItemWithIcon[] {
    const { t } = useTranslation()

    return [
        { icon: LogIn, route: routes.auth.login, title: t("Login") },
        { icon: UserPlus, route: routes.auth.register, title: t("Register") },
        { icon: MdLockReset, route: routes.auth.forgotPassword, title: t("Forgot Password") },
    ]
}

// profile dropdown items with translations
export function useLoggedInAuthItems(): NavBarItemWithIcon[] {
    const { t } = useTranslation()

    return [
        {
            icon: User,
            route: routes.user.profile,
            title: t("My Profile"),
        },
        {
            icon: UserCog,
            route: routes.dummy,
            title: t("Profile settings"),
        },
        {
            icon: ShoppingCart,
            route: routes.dummy,
            title: t("Cart"),
        },
        {
            icon: Receipt,
            route: routes.dummy,
            title: t("Orders"),
        },
    ]
}

// navigation items without translations
export const dropdownItems: NavBarItemWithIcon[] = [
    {
        icon: Home,
        route: routes.home,
        title: "Service 1",
    },
    {
        icon: Home,
        route: routes.home,
        title: "Service 2",
    },
    {
        icon: Home,
        route: routes.home,
        subMenu: [
            { icon: Home, route: routes.home, separator: true, title: "Service 3.1" },
            { icon: Home, route: routes.home, title: "Service 3.2" },
            { icon: Home, route: routes.home, title: "Service 3.3" },
        ],
        title: "Service 3",
    },
]

// navigation items without translations
export const navigationItems: NavBarItemWithIcon[] = [
    { icon: MessageCircleWarning, route: routes.about, title: "About" },
    { icon: HelpCircle, route: routes.services, title: "FAQs" },
    { icon: Phone, route: routes.contact, title: "Contact" },
]

export const notLoggedInAuthItems: NavBarItemWithIcon[] = [
    { icon: LogIn, route: routes.auth.login, title: "Login" },
    { icon: UserPlus, route: routes.auth.register, title: "Register" },
    { icon: MdLockReset, route: routes.auth.forgotPassword, title: "Forgot Password" },
]

// profile dropdown items without translations
export const loggedInAuthItems: NavBarItemWithIcon[] = [
    {
        icon: User,
        route: routes.user.profile,
        title: "Profile",
    },
    {
        icon: UserCog,
        route: routes.dummy,
        title: "Account Settings",
    },
    {
        icon: ShoppingCart,
        route: routes.dummy,
        title: "Cart",
    },
    {
        icon: Receipt,
        route: routes.dummy,
        title: "Orders",
    },
    {
        icon: FaSignOutAlt,
        route: routes.auth.signOut,
        title: "Logout",
    },
]
