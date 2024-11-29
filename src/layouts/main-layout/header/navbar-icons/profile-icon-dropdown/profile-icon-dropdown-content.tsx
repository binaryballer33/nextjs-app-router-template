"use client"

import { useRouter } from "next/navigation"

import { useCallback } from "react"

import { useTranslation } from "react-i18next"

import signOut from "@/actions/auth/sign-out"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import handleServerResponse from "@/lib/utils/helper-functions/handleServerResponse"
import profileIconDropdownNavItems from "@/routes/profile-dropdown-icon-routes"
import routes from "@/routes/routes"
import { LockOpen } from "lucide-react"
import toast from "sonner"

import AvatarTitleDescriptionAlternate from "./profile-icon-avatar-title-description"


type ProfileDropdownProps = {
    onClose: () => void
    open?: boolean
}


export default function ProfileIconDropdown(props: ProfileDropdownProps) {
    const { t } = useTranslation()
    const {  onClose, open } = props

    const router = useRouter()

    const handleSignOut = useCallback(async (): Promise<void> => {
        onClose() // close the profile dropdown
        const response = await signOut() // sign out the user with next auth
        await handleServerResponse({ redirectTo: routes.auth.signOut, response, toast })
    }, [onClose])

    const handleNavItemClick = (route: string): void => {
        onClose()
        router.push(route)
    }

    return (
                <DropdownMenu onOpenChange={onClose} open={open}>

        <DropdownMenuContent
            className="w-[280px] p-0"
            onInteractOutside={onClose}
            open={!!open}
        >
            <div className="bg-muted/5 dark:bg-muted/2 overflow-hidden p-6">
                <AvatarTitleDescriptionAlternate />
            </div>

            <DropdownMenuSeparator className="mb-1" />

            {/* Profile Icon Dropdown Profile Links */}
            {profileIconDropdownNavItems.map((item) => (
                <DropdownMenuItem
                    className="mx-1 rounded-md px-2 py-2 hover:bg-primary/10 hover:text-primary-foreground
                    data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary-foreground"
                    data-selected={item.title === "Email Notifications"}
                    key={item.title}
                    onClick={() => handleNavItemClick(item.route!)}
                >
                    <span className="flex-grow font-medium">
                        {t(item.title)}
                    </span>
                    <span className="opacity-50 hover:opacity-80">
                        {item.icon}
                    </span>
                </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Sign Out Link */}
            <div className="m-1">
                <Button
                    className="w-full"
                    onClick={handleSignOut}
                    variant="secondary"
                >
                    <LockOpen className="mr-2 h-4 w-4" />
                    {t("Sign Out")}
                </Button>
            </div>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}
