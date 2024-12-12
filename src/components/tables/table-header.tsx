"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header } from "@tanstack/react-table"

import { flexRender } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableHead } from "@/components/ui/table"

interface TableHeaderProps {
    header: Header<Trade, unknown>
}

export default function TableHeader(props: TableHeaderProps) {
    const { header } = props

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    return (
        <TableHead className={`relative${isPinned ? "bg-purple-900" : ""}`} style={{ width: header.getSize() }}>
            {/* Column header content */}
            <div className="flex items-center justify-center gap-1">
                <div className="text-sm">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </div>

                {/* Sort indicator */}
                {isSorted && (
                    <div>
                        {isSorted === "asc" && <ArrowDown className="h-4 w-4" />}
                        {isSorted === "desc" && <ArrowUp className="h-4 w-4" />}
                    </div>
                )}
            </div>

            {/* Dropdown menu for column actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="absolute right-1 top-2.5" size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {isPinned !== "right" && (
                        <DropdownMenuItem onClick={() => header.column.pin("right")}>Pin to Right</DropdownMenuItem>
                    )}
                    {isPinned !== "left" && (
                        <DropdownMenuItem onClick={() => header.column.pin("left")}>Pin to Left</DropdownMenuItem>
                    )}
                    {isPinned && <DropdownMenuItem onClick={() => header.column.pin(false)}>Unpin</DropdownMenuItem>}
                    <DropdownMenuItem onClick={header.column.getToggleSortingHandler()}>
                        {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableHead>
    )
}
