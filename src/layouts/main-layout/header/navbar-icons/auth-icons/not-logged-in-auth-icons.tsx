import Link from "next/link"

import { Lock } from "lucide-react"

import { notLoggedInAuthItems } from "@/routes/navbar"
import routes from "@/routes/routes"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function NotLoggedInAuthIcons() {
    return (
        <NavigationMenu className="w-auto">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-2">
                        <Link href={routes.auth.login}>
                            <Lock className="h-4 w-4" />
                        </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="data-[side=bottom]:animate-slideUpAndFade min-w-[225px] p-0">
                        <div className="flex flex-col p-2">
                            {notLoggedInAuthItems.map((item) => (
                                // create the navigation menu items
                                <Link
                                    className="flex h-12 cursor-pointer items-center justify-between px-4 py-2 hover:bg-accent"
                                    href={item.route}
                                    key={item.title}
                                >
                                    <span className="text-base">{item.title}</span>
                                    <item.icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
