"use client"

import type { NavBarItem } from "@/types/navbar-item"

import { Fragment, useRef, useState } from "react"

import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NestedDropdownMenuProps = {
    className?: string
    navItems: NavBarItem[]
    title: string
}

export default function NestedDropdownMenu(props: NestedDropdownMenuProps) {
    const { className, navItems, title } = props

    const [open, setOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 800)
    }

    return (
        <div className={cn("w-fit p-0", className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <DropdownMenu onOpenChange={setOpen} open={open}>
                <DropdownMenuTrigger asChild>
                    <Button className="w-fit justify-between" variant="ghost">
                        {title}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                    {navItems.map((navItem) => (
                        <Fragment key={navItem.title}>
                            {/* menu item */}
                            {!navItem.subMenu && (
                                <DropdownMenuItem className="cursor-pointer">{navItem.title}</DropdownMenuItem>
                            )}

                            {/* optional separator */}
                            {navItem.separator && <DropdownMenuSeparator />}

                            {/* submenu */}
                            {navItem.subMenu && (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{navItem.title}</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="w-fit">
                                        {navItem.subMenu.map((subItem) => (
                                            <DropdownMenuItem className="cursor-pointer" key={subItem.title}>
                                                {subItem.title}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            )}
                        </Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
