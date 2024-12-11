"use client"

import Link from "next/link"

import { Home } from "lucide-react"

import { dropdownItems, navigationItems } from "@/routes/navbar"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Logo from "../navbar-icons/logo/logo"
import DesktopNavbarIcons from "./desktop-navbar-icons"
import DesktopNavbarNestedDropdownMenu from "./desktop-navbar-nested-dropdown-menu"

export default function DesktopNavbar() {
    return (
        <div className="hidden w-full items-center md:flex">
            <NavigationMenu className="w-full">
                <Logo />

                <div className="flex w-full items-center justify-between">
                    <NavigationMenuList>
                        {/* desktop nested navigation links */}
                        <DesktopNavbarNestedDropdownMenu dropdownItems={dropdownItems} Icon={Home} title="Services" />

                        {/* desktop navigation route links */}
                        {navigationItems.map((item) => (
                            <NavigationMenuItem key={item.title}>
                                <Link href={item.route} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <div className="flex items-center gap-2 hover:text-primary">
                                            {item.icon && <item.icon className="h-4 w-4" />}
                                            {item.title}
                                        </div>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </div>
            </NavigationMenu>

            {/* desktop navbar icons */}
            <div className="ml-auto items-center">
                <DesktopNavbarIcons />
            </div>
        </div>
    )
}
