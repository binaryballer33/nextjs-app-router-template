"use client"

import { type NavBarItem } from "@/types/navbar-item"

import { usePathname, useRouter } from "next/navigation"

import { type FC, useRef, useState } from "react"

import { ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const isRouteActive = (route?: string, currentPath?: string, subMenu?: NavBarItem[]): boolean | undefined => {
    if (route && route === currentPath) return true
    return subMenu?.some((item) => item.route && isRouteActive(item.route, currentPath, item.subMenu))
}

type DesktopNavBarItemProps = {
    isSub?: boolean
    navbarItem: NavBarItem
}

const DesktopNavBarItem: FC<DesktopNavBarItemProps> = ({ isSub, navbarItem }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const anchorRef = useRef(null)
    const isActive = navbarItem.route ? isRouteActive(navbarItem.route, pathname, navbarItem.subMenu) : false

    const handleMouseEnter = () => {
        setIsOpen(true)
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
        setIsHovered(false)
    }

    const handleClick = () => {
        if (navbarItem.route) {
            router.push(navbarItem.route)
        }
    }

    const SubButton = () => (
        <Button
            className={cn(
                "w-full justify-between text-sm font-semibold",
                "hover:bg-primary/10 hover:text-primary active:bg-primary/10 active:text-primary",
                "text-muted-foreground dark:text-neutral-300",
                "my-[1px]"
            )}
            onClick={handleClick}
            variant="ghost"
        >
            <span className="flex items-center gap-2">
                {navbarItem.icon}
                {navbarItem.title}
            </span>
            {navbarItem.subMenu && <ChevronRight className="h-4 w-4" />}
        </Button>
    )

    const MainButton = () => (
        <Button
            className={cn(
                "text-sm font-medium mr-6 px-6 py-3.5",
                "hover:bg-neutral-300/50 dark:hover:bg-neutral-900 hover:text-primary",
                {
                    "bg-background": isHovered,
                    "bg-background dark:bg-background": isActive,
                    "text-neutral-900 dark:text-neutral-400": !isHovered && !isActive,
                    "text-secondary-dark": isHovered || isActive,
                }
            )}
            onClick={handleClick}
            variant="ghost"
        >
            <span className="flex items-center gap-2">
                {navbarItem.icon}
                {navbarItem.title}
            </span>
            {navbarItem.subMenu && <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
    )

    if (!navbarItem.subMenu) {
        return isSub ? <SubButton /> : <MainButton />
    }

    return (
        <div
            className={cn("relative z-10")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={anchorRef}
        >
            <Popover open={isOpen}>
                <PopoverTrigger asChild>
                    {isSub ? <SubButton /> : <MainButton />}
                </PopoverTrigger>
                <PopoverContent
                    align={isSub ? "start" : "start"}
                    className={cn(
                        "w-max min-w-[200px] p-2",
                        "bg-background rounded-md shadow-lg",
                        isSub ? "ml-1" : "mt-[-1px]",
                        {
                            "rounded-tl-none": !isSub && navbarItem.subMenu,
                        }
                    )}
                    side={isSub ? "right" : "bottom"}
                >
                    {navbarItem.subMenu.map((subItem) => (
                        <DesktopNavBarItem
                            isSub
                            key={subItem.title}
                            navbarItem={subItem}
                        />
                    ))}
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DesktopNavBarItem
