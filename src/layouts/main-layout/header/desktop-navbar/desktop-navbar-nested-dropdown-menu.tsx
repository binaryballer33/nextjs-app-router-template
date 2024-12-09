import type { NavBarItemWithIcon } from "@/types/navbar-item"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons"

import Link from "next/link"

import { Fragment } from "react"

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

type DesktopNavbarNestedDropdownMenuProps = {
    className?: string
    dropdownItems: NavBarItemWithIcon[]
    Icon?: IconType | LucideIcon
    title: string
}

export default function DesktopNavbarNestedDropdownMenu(props: DesktopNavbarNestedDropdownMenuProps) {
    const { className, dropdownItems, Icon, title } = props

    return (
        <div className={cn("w-fit p-0", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-fit justify-between" variant="ghost">
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="h-4 w-4" />}
                            {title}
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-fit">
                    {dropdownItems.map((navItem) => (
                        <Fragment key={navItem.title}>
                            {/* navigation route link */}
                            {!navItem.subMenu && (
                                <Link href={navItem.route} passHref>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            {navItem.icon && <navItem.icon className="h-4 w-4" />}
                                            {navItem.title}
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                            )}

                            {/* optional line divider separator */}
                            {navItem.separator && <DropdownMenuSeparator />}

                            {/* nested dropdown menu */}
                            {navItem.subMenu && (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <div className="flex items-center gap-2">
                                            {navItem.icon && <navItem.icon className="h-4 w-4" />}
                                            {navItem.title}
                                        </div>
                                    </DropdownMenuSubTrigger>

                                    <DropdownMenuSubContent>
                                        {navItem.subMenu.map((subItem) => (
                                            <Link href={subItem.route} key={subItem.title} passHref>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                                        {subItem.title}
                                                    </div>
                                                </DropdownMenuItem>

                                                {/* optional line divider separator */}
                                                {subItem.separator && <DropdownMenuSeparator />}
                                            </Link>
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
