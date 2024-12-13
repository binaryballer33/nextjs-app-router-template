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

    // don't show the vertical menu for these columns
    const hideVerticalMenuForColumns = ["selection", "expand", "delete"]

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    return (
        <TableHead
            className={`cursor-pointer whitespace-nowrap ${isPinned ? "bg-purple-900" : ""}`}
            onClick={header.column.getToggleSortingHandler()}
            style={{ width: header.getSize() }}
        >
            {/* Column header content */}
            <div className="flex items-center justify-center gap-1">
                <div className="text-sm">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </div>

                {/* Sort direction indicator */}
                {isSorted && (
                    <div>
                        {isSorted === "asc" && <ArrowDown className="h-4 w-4" />}
                        {isSorted === "desc" && <ArrowUp className="h-4 w-4" />}
                    </div>
                )}

                {/* Dropdown menu for column actions */}
                {!hideVerticalMenuForColumns.includes(header.column.id) && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            {/* Pin to right */}
                            {isPinned !== "right" && (
                                <DropdownMenuItem onClick={() => header.column.pin("right")}>
                                    Pin to Right
                                </DropdownMenuItem>
                            )}

                            {/* Pin to left */}
                            {isPinned !== "left" && (
                                <DropdownMenuItem onClick={() => header.column.pin("left")}>
                                    Pin to Left
                                </DropdownMenuItem>
                            )}

                            {/* Unpin */}
                            {isPinned && (
                                <DropdownMenuItem onClick={() => header.column.pin(false)}>Unpin</DropdownMenuItem>
                            )}

                            {/* Sort */}
                            <DropdownMenuItem onClick={header.column.getToggleSortingHandler()}>
                                {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </TableHead>
    )
}
