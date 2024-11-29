import { type NavBarItem } from "@/types/navbar-item"

import useMediaQuery  from "@/hooks/use-media-query"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"


import MobileNavBarNavItem from "./mobile-navbar-nav-item"
import Logo from "../navbar-icons/logo/logo"

const SIDEBAR_WIDTH = "280px" // Moved from theme/utils

type MobileNavBarProps = {
    navbarItems?: NavBarItem[]
}

export default function MobileNavBar({ navbarItems }: MobileNavBarProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!navbarItems) return null

    return (
        <nav
            className={cn(
                "flex h-screen w-[280px] flex-col",
                `w-[${SIDEBAR_WIDTH}]`,
                "bg-neutral-100 dark:bg-neutral-900",
                "text-neutral-900 dark:text-neutral-100",
                "overflow-auto"
            )}
        >
            <div className="flex items-center justify-start lg:justify-between p-4">
                <Logo />
            </div>

            <ScrollArea className="flex-1 overflow-auto">
                <NavigationMenu className="w-full" orientation="vertical">
                    <NavigationMenuList className="flex-col items-start">
                        {navbarItems.map((navbarItem) => (
                            <div className="w-full" key={navbarItem.title}>
                                <NavigationMenuContent>
                                    <div
                                        className={cn(
                                            "bg-neutral-100 dark:bg-neutral-900",
                                            "text-neutral-900 dark:text-neutral-100",
                                            "text-xs font-medium uppercase",
                                            "py-5 px-4",
                                            { "sticky top-0": isDesktop }
                                        )}
                                    >
                                        {navbarItem.title}
                                    </div>
                                    <div>
                                        {navbarItem.subMenu?.map((subItem) => (
                                            <MobileNavBarNavItem
                                                item={subItem}
                                                key={subItem.title}
                                            />
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </div>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </ScrollArea>
        </nav>
    )
}
