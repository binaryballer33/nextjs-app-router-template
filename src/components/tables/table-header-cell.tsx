"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table"

import { flexRender } from "@tanstack/react-table"

import { TableHead } from "@/components/ui/table"

import TableHeaderDropdownMenu from "./table-header-dropdown-menu"
import TableHeaderResizer from "./table-header-resizer"
import TableHeaderSortIndicator from "./table-header-sort-indicator"

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
                <TableHeaderSortIndicator isSorted={isSorted} />

                {/* Dropdown menu for column actions */}
                {!hideVerticalMenuForColumns.includes(header.column.id) && (
                    <div className="invisible group-hover:visible">
                        <TableHeaderDropdownMenu header={header} />
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
