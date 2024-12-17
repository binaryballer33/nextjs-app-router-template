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

interface TableHeaderCustomHeadProps {
    header: Header<Trade, unknown>
    table: Table<Trade>
}

// TODO: put this in the use-create-table-columns.tsx file, there will be a mistake in the future if not added there
// TODO: i want the table header cell to take up as little space as possible and grow wide wihen you hover over it so it can include the other features it offers
export default function TableHeaderCustomHead(props: TableHeaderCustomHeadProps) {
    const { header, table } = props

    // don't show the vertical menu for these columns
    const hideForColumns = ["selection", "expand", "delete", "drag-handle"]

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    // dnd code for styling the table header cell and handling the column reordering
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
        // this is needed for the dnd sortable to work, it needs to know what if its a column or row
        data: { type: "column" },
        id: header.column.id,
    })

    // dnd draggable styles for the table header cell
    const style: CSSProperties = {
        minWidth: header.column.columnDef.minSize || 0,
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition,
        whiteSpace: "nowrap",
        width: Math.max(header.column.getSize(), header.column.columnDef.minSize || 0),
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
                </div>

                {/* Sort direction indicator */}
                <TableHeaderSortIndicator isSorted={isSorted} />

                {/* dnd column heaeder reordering button */}
                {!hideForColumns.includes(header.column.id) && (
                    <GripVertical className="invisible h-5 w-5 group-hover:visible" {...attributes} {...listeners} />
                )}

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
