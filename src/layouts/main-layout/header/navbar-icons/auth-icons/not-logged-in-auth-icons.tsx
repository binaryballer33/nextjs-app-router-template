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
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-2">
                        <Link href={routes.auth.login}>
                            <Lock className="h-4 w-4" />
                        </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="flex flex-col gap-2 text-sm">
                            {notLoggedInAuthItems.map((link) => (
                                <Link
                                    className="flex w-[150px] items-center gap-2 rounded-md p-2 hover:bg-accent"
                                    href={link.route}
                                    key={link.title}
                                >
                                    <link.icon className="h-4 w-4" />
                                    <p className="font-sm">{link.title}</p>
                                </Link>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
