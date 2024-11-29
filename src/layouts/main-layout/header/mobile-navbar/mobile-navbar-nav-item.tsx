"use client"

import type { NavBarItem } from "@/types/navbar-item"

import { usePathname } from "next/navigation"

import { useState } from "react"

import { ChevronRight } from "lucide-react"

import RouterLink from "@/components/base/router-link"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type NavBarItemProps = {
    item: NavBarItem
}

export default function MobileNavBarNavItem({ item }: NavBarItemProps) {
    const { icon, route, subMenu, title } = item
    const pathname = usePathname()
    const isActive = route && pathname.includes(route)
    const isSubMenuActive = subMenu?.some((sub) => sub.route && pathname.includes(sub.route))
    const [open, setOpen] = useState(isSubMenuActive)

    return (
        <div className="px-2">
            {subMenu ? (
                <Collapsible onOpenChange={setOpen} open={open}>
                    <CollapsibleTrigger asChild>
                        <button
                            className={cn(
                                // Base styles
                                "flex w-full items-center rounded-md border px-2 py-2 text-sm font-semibold",
                                "transition-none border-transparent",
                                "mb-0.5",
                                // Icon styles
                                "[&_.icon]:min-w-11 [&_.icon]:text-neutral-900 dark:[&_.icon]:text-neutral-100",
                                // Hover styles
                                "hover:bg-neutral-700/8 hover:border-neutral-600/8",
                                "hover:text-neutral-900 dark:hover:text-neutral-100",
                                // Selected styles
                                (isActive || isSubMenuActive) && [
                                    "bg-neutral-500/10 text-neutral-50",
                                    "hover:bg-neutral-500/10 hover:text-neutral-50",
                                    "border-neutral-700/15"
                                ]
                            )}
                        >
                            {icon && <span className="icon">{icon}</span>}
                            <span className="m-0">{title}</span>
                            <div
                                className={cn(
                                    "flex items-center justify-center transition-transform",
                                    open ? "rotate-90" : "rotate-0"
                                )}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </div>
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="-mx-2">
                            <div className="space-y-0.5 pt-0.5">
                                {subMenu.map((subItem) => (
                                    <div
                                        className={cn(
                                            "relative pl-[26px]",
                                            "before:absolute before:left-11 before:top-1/2 before:-mt-[3px]",
                                            "before:h-1.5 before:w-1.5 before:rounded",
                                            "before:bg-neutral-100 before:opacity-0 before:scale-0",
                                            "before:transition-all",
                                            "hover:before:opacity-100 hover:before:scale-100"
                                        )}
                                        key={subItem.title}
                                    >
                                        <MobileNavBarNavItem item={subItem} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ) : (
                <button
                    className={cn(
                        // Base styles
                        "flex w-full items-center rounded-md border px-2 py-2 text-sm font-semibold",
                        "transition-none border-transparent",
                        "mb-0.5",
                        // Icon styles
                        "[&_.icon]:min-w-11 [&_.icon]:text-neutral-900 dark:[&_.icon]:text-neutral-100",
                        // Hover styles
                        "hover:bg-neutral-700/8 hover:border-neutral-600/8",
                        "hover:text-neutral-900 dark:hover:text-neutral-100",
                        // Selected styles
                        isActive && [
                            "bg-neutral-500/10 text-neutral-50",
                            "hover:bg-neutral-500/10 hover:text-neutral-50",
                            "border-neutral-700/15"
                        ]
                    )}
                    component={route ? RouterLink : "button"}
                    href={route || undefined}
                >
                    {icon && <span className="icon">{icon}</span>}
                    <span className="m-0">{title}</span>
                </button>
            )}
        </div>
    )
}
