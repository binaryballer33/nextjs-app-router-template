"use client"

import type { NavBarItem } from "@/types/navbar-item"

import { useRef, useState } from "react"

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
                    <Button
                        className="w-fit justify-between bg-zinc-900 text-white hover:bg-zinc-800"
                        variant="default"
                    >
                        {title}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit border-zinc-800 bg-zinc-900 text-white">
                    {navItems.map((navItem) => (
                        <>
                            {/* menu item */}
                            {!navItem.subMenu && (
                                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800">
                                    {navItem.title}
                                </DropdownMenuItem>
                            )}

                            {/* optional separator */}
                            {navItem.separator && <DropdownMenuSeparator className="bg-zinc-800" />}

                            {/* submenu */}
                            {navItem.subMenu && (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800">
                                        {navItem.title}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="border-zinc-800 bg-zinc-900 text-white">
                                        {navItem.subMenu.map((subItem) => (
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800"
                                                key={subItem.title}
                                            >
                                                {subItem.title}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            )}
                        </>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
