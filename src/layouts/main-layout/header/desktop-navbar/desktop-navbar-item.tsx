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

function DesktopNavBarItem(props: DesktopNavBarItemProps) {
    const { isSub, navbarItem } = props
    
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const anchorRef = useRef<HTMLButtonElement>(null)
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

    if (navbarItem.subMenu && navbarItem.subMenu.length > 0) {
        return (
            <Popover open={isOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={anchorRef}
                        variant="ghost"
                        className={cn(
                            "group flex w-max items-center gap-1",
                            isActive && "text-primary",
                            isSub ? "h-8 justify-between" : "h-10"
                        )}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {navbarItem.title}
                        {isSub ? (
                            <ChevronRight className="size-4" />
                        ) : (
                            <ChevronDown className="size-4" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={cn(
                        "w-48 p-2",
                        !isSub && "mt-2"
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    align={isSub ? "start" : "center"}
                    side={isSub ? "right" : "bottom"}
                >
                    {navbarItem.subMenu.map((item) => (
                        <DesktopNavBarItem
                            key={item.title}
                            isSub
                            navbarItem={item}
                        />
                    ))}
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Button
            ref={anchorRef}
            variant="ghost"
            className={cn(
                "w-full",
                isActive && "text-primary",
                isSub ? "h-8 justify-start" : "h-10"
            )}
            onClick={handleClick}
        >
            {navbarItem.title}
        </Button>
    )
}

export default DesktopNavBarItem
