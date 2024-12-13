"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table"

import { flexRender } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableHead } from "@/components/ui/table"

// import TableAdvancedFilter from "./table-advanced-filter"

interface TableHeaderCellProps {
    header: Header<Trade, unknown>
    table: Table<Trade>
}

export default function TableHeaderCell(props: TableHeaderCellProps) {
    const { header, table } = props

    // don't show the vertical menu for these columns
    const hideVerticalMenuForColumns = ["selection", "expand", "delete"]

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    return (
        <TableHead
            className={`group relative cursor-pointer whitespace-nowrap bg-accent ${isPinned ? "bg-purple-900" : ""}`}
            onClick={header.column.getToggleSortingHandler()}
            style={{
                minWidth: header.column.columnDef.minSize || 0,
                position: "relative",
                width: Math.max(header.getSize(), header.column.columnDef.minSize || 0),
            }}
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
                    <div className="invisible group-hover:visible">
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
                    </div>
                )}

                {/* Table header resizer */}
                {!hideVerticalMenuForColumns.includes(header.column.id) && header.column.getCanResize() && (
                    <TableHeaderResizer header={header} table={table} />
                )}
            </div>
        </TableHead>
    )
}

function TableHeaderResizer(props: TableHeaderCellProps) {
    const { header, table } = props

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={`
                absolute right-0 top-0 h-full w-5
                cursor-col-resize touch-none select-none
                hover:bg-secondary/50 hover:opacity-100
                ${table.options.columnResizeDirection}
                ${header.column.getIsResizing() ? "bg-secondary opacity-100" : "opacity-0"}
            `}
            onDoubleClick={() => header.column.resetSize()}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
        />
    )
}
