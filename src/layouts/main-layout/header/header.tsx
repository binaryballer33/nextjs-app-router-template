"use client"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import useDialog from "@/hooks/use-dialog"
import useMobileNav from "@/hooks/use-mobile-nav"
import usePopover from "@/hooks/use-popover"
import useHorizontalNavBarItems from "@/routes/horizontal-navbar-routes"
import routes from "@/routes/routes"
import { Lock, Menu, Search } from "lucide-react"

import { useSession } from "next-auth/react"

import DesktopNavBar from "./desktop-navbar/desktop-navbar"
import MobileNavBar from "./mobile-navbar/mobile-navbar"
import LanguageDropdown from "./navbar-icons/language-icon/language-icon-dropdown"
import Logo from "./navbar-icons/logo/logo"
import ProfileIconDropdown from "./navbar-icons/profile-icon-dropdown/profile-icon-dropdown-content"
import ThemeModeToggler from "./navbar-icons/theme-mode-toggler/theme-mode-toggler"

export default function Header() {
    const router = useRouter()
    const dialog = useDialog()
    const navbarItems = useHorizontalNavBarItems()
    const popover = usePopover<HTMLButtonElement>()
    const { handleClose, handleOpen, open } = useMobileNav()
    const { data: session } = useSession()

    const isDesktop = useMediaQuery("(min-width: 1024px)") // lg breakpoint
    const isTablet = useMediaQuery("(min-width: 640px)") // sm breakpoint

    return (
        <>
            <header className="sticky top-0 z-10 bg-background">
                <div className="flex items-center justify-between px-4 py-6">
                    {/* Desktop NavBar Section */}
                    <div className="flex items-center gap-4">
                        <div className="scale-[0.86]">
                            <Logo />
                        </div>

                        {/* Desktop NavBar */}
                        {isDesktop && <DesktopNavBar navbarItems={navbarItems} />}
                    </div>

                    {/* Header Icons Section */}
                    <div className="flex items-center gap-x-2 sm:gap-x-4">
                        {/* Other Header Icons */}
                        <div className="flex items-center gap-x-2">
                            {isTablet && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                                                onClick={dialog.handleOpen}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Search className="h-[22px] w-[22px]" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Search The Page</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>

                        <LanguageDropdown />
                        <ThemeModeToggler />

                        {/* Login Icon & Profile Icon */}
                        {session?.user ? (
                            <ProfileIconDropdown
                                onClose={popover.handleClose}
                                open={popover.open}
                            />
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={() => router.push(routes.auth.login)}
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <Lock className="h-5 w-5 text-primary" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Login</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        {/* Show Mobile Menu Icon Button */}
                        {!isDesktop && (
                            <Button
                                className="h-9 w-9 hover:bg-primary hover:text-primary-foreground"
                                onClick={handleOpen}
                                size="icon"
                                variant="ghost"
                            >
                                <Menu className="h-[22px] w-[22px]" />
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile NavBar Section */}
            {!isDesktop && (
                <Sheet onOpenChange={handleClose} open={open}>
                    <SheetContent className="w-full bg-neutral-900 p-0 sm:w-80" side="left">
                        <MobileNavBar navbarItems={navbarItems} />
                    </SheetContent>
                </Sheet>
            )}
        </>
    )
}

// Custom hook for media queries
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        window.addEventListener("resize", listener)
        return () => window.removeEventListener("resize", listener)
    }, [matches, query])

    return matches
}
