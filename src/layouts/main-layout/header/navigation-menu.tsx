"use client"

import type { NavBarItemWithIcon } from "@/types/navbar-item"

import Link from "next/link"

import { HelpCircle, Home, Info, Phone } from "lucide-react"

import routes from "@/routes/routes"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import DropdownMenuButton from "./dropdown-menu-button"
import Logo from "./logo"

const dropdownMenuItems: NavBarItemWithIcon[] = [
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
            { route: routes.home, title: "Service 3.1" },
            { route: routes.home, title: "Service 3.2" },
            { route: routes.home, title: "Service 3.3" },
        ],
        title: "Service 3",
    },
]

const links: NavBarItemWithIcon[] = [
    { icon: Info, route: routes.about, title: "About" },
    { icon: HelpCircle, route: routes.services, title: "FAQs" },
    { icon: Phone, route: routes.contact, title: "Contact" },
]

export default function Navbar() {
    return (
        <NavigationMenu className="hidden md:flex">
            <Logo />
            <NavigationMenuList>
                <DropdownMenuButton navItems={dropdownMenuItems} title="Services" />

                {/* navigation route links */}
                {links.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link href={link.route} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {link.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
