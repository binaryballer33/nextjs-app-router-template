"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table" // needed for table body level scope DnD setup
import { type CSSProperties } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender } from "@tanstack/react-table"
import { GripVertical } from "lucide-react"

import { TableHead } from "@/components/ui/table"

import TableHeaderDropdownMenu from "./table-header-dropdown-menu"
import TableHeaderResizer from "./table-header-resizer"
import TableHeaderSortIndicator from "./table-header-sort-indicator"

interface TableHeaderCellProps {
    header: Header<Trade, unknown>
    table: Table<Trade>
}

export default function TableHeaderCell(props: TableHeaderCellProps) {
    const { header, table } = props

    // don't show the vertical menu for these columns
    const hideForColumns = ["selection", "expand", "delete"]

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    // dnd code for styling the table header cell and handling the column reordering
    const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
        id: header.column.id,
    })

    const style: CSSProperties = {
        minWidth: header.column.columnDef.minSize || 0,
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: "width transform 0.2s ease-in-out",
        whiteSpace: "nowrap",
        width: Math.max(header.getSize(), header.column.columnDef.minSize || 0),
        zIndex: isDragging ? 1 : 0,
    }

    return (
        // Table header cell container, displays everything in the header cell
        <TableHead
            className={`group relative cursor-pointer whitespace-nowrap bg-accent ${isPinned ? "bg-purple-900" : ""}`}
            colSpan={header.colSpan}
            onClick={header.column.getToggleSortingHandler()}
            ref={setNodeRef} // for dnd column reordering
            style={style}
        >
            <div className="flex items-center justify-center gap-1">
                {/* Column header text */}
                <div className="flex items-center gap-1 text-sm">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                    {/* dnd column heaeder reordering button */}
                    <GripVertical
                        className="invisible h-5 w-5 group-hover:visible"
                        type="button"
                        {...attributes}
                        {...listeners}
                    />
                </div>

                {/* Sort direction indicator */}
                <TableHeaderSortIndicator isSorted={isSorted} />

                {/* Dropdown menu for column actions */}
                {!hideForColumns.includes(header.column.id) && (
                    // div that is hidden by default, but visible when hovering over the header cell
                    <div className="invisible group-hover:visible">
                        <TableHeaderDropdownMenu header={header} />
                    </div>
                )}

                {/* Table header resizer */}
                {!hideForColumns.includes(header.column.id) && header.column.getCanResize() && (
                    <TableHeaderResizer header={header} table={table} />
                )}
            </div>
        </TableHead>
    )
}
