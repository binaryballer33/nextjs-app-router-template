"use client"

import type { ExtendedUser } from "@/types/types.d/next-auth-types"

import Link from "next/link"

import { useCallback } from "react"

import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

import handleServerResponse from "@/lib/helper-functions/handleServerResponse"
import { cn } from "@/lib/utils"

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
import { Separator } from "@/components/ui/separator"

export default function ProfileMenu() {
    const { user } = useAuthUser()

    const handleSignOut = useCallback(async (): Promise<void> => {
        const response = await signOut() // sign out the user with next auth
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [])

    if (!user) return null

    return (
        <NavigationMenu className="w-auto">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <AvatarLink className="h-6 w-6" user={user} />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="data-[side=bottom]:animate-slideUpAndFade min-w-[250px] p-0">
                        {/* Avatar and user info */}
                        <div className="flex items-center gap-3 border-b p-4">
                            <AvatarLink user={user} />

                            {/* User Info */}
                            <div className="flex flex-col">
                                <span className="text-lg">
                                    {user.firstName} {user.lastName}
                                </span>

                                <span className="flex items-center gap-2 text-muted-foreground">
                                    2FA Enabled{" "}
                                    {user.isTwoFactorEnabled ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Navigation menu */}
                        <div className="flex flex-col p-2">
                            {loggedInAuthItems.map((item) => {
                                // create the sign out button
                                if (item.route === routes.auth.signOut) {
                                    return (
                                        <div
                                            className="flex w-full flex-col items-center justify-between gap-2"
                                            key={item.title}
                                        >
                                            <Separator />
                                            <Button
                                                className="flex h-12 w-full cursor-pointer items-center justify-between bg-accent px-4 py-2 hover:bg-accent/50 hover:text-red-500"
                                                key={item.title}
                                                onClick={handleSignOut}
                                                variant="ghost"
                                            >
                                                <span className="text-base">{item.title}</span>
                                                <item.icon className="!h-6 !w-6" />
                                            </Button>
                                        </div>
                                    )
                                }

                                // create the navigation menu items
                                return (
                                    <Link
                                        className="flex h-12 cursor-pointer items-center justify-between px-4 py-2 hover:bg-accent"
                                        href={item.route}
                                        key={item.title}
                                    >
                                        <span className="text-base">{item.title}</span>
                                        <item.icon className="h-6 w-6" />
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

type AvatarLinkProps = {
    className?: string
    user: ExtendedUser
}

function AvatarLink(props: AvatarLinkProps) {
    const { className, user } = props

    if (!user) return null

    return (
        <Link href={routes.user.profile}>
            <Avatar className={cn("h-12 w-12", className)}>
                <AvatarImage alt="Profile picture" src={user?.imageUrl} />
                <AvatarFallback>
                    <span className="text-xs">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                    </span>
                </AvatarFallback>
            </Avatar>
        </Link>
    )
}
