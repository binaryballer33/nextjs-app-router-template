"use client"

import Link from "next/link"

import { useCallback } from "react"

import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"

import signOut from "@/actions/auth/sign-out"

import useAuthUser from "@/hooks/useAuthUser"

import { loggedInAuthItems } from "@/routes/navbar"
import routes from "@/routes/routes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function LoggedInAuthIcons() {
    const { user } = useAuthUser()

    const handleSignOut = useCallback(async (): Promise<void> => {
        const response = await signOut() // sign out the user with next auth
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [])

    const placeholderImage = "https://placehold.co/600x600"

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-2">
                        <Link href={routes.user.profile}>
                            <Avatar className="h-6 w-6">
                                <AvatarImage alt="Profile picture" src={user?.imageUrl || placeholderImage} />
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                        </Link>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div className="flex flex-col gap-2 text-sm">
                            {loggedInAuthItems.map((link) => {
                                // create the sign out button
                                if (link.route === routes.auth.signOut) {
                                    return (
                                        <Button
                                            className="flex w-[150px] items-center gap-2 rounded-md p-2 hover:bg-accent"
                                            key={link.title}
                                            onClick={handleSignOut}
                                        >
                                            <link.icon className="h-4 w-4" />
                                            {link.title}
                                        </Button>
                                    )
                                }

                                // create the other logged in links
                                return (
                                    <Link
                                        className="flex w-[150px] items-center gap-2 rounded-md p-2 hover:bg-accent"
                                        href={link.route}
                                        key={link.title}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        <p className="font-sm">{link.title}</p>
                                    </Link>
                                )
                            })}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
