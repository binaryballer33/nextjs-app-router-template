"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table" // needed for table body level scope DnD setup
import { type CSSProperties } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender } from "@tanstack/react-table"
import { GripVertical } from "lucide-react"

import { TableHead } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableHeaderDropdownMenu from "./table-header-dropdown-menu"
import TableHeaderResizer from "./table-header-resizer"
import TableHeaderSortIndicator from "./table-header-sort-indicator"

const createWithTooltip = (trigger: string, tooltipContent: string, delayDuration = 100) => {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="flex items-center gap-1 text-sm transition-opacity group-hover:opacity-0">
                            {trigger}
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

type TableHeaderCustomHeadProps = {
    header: Header<Trade, unknown>
    table: Table<Trade>
}

// TODO: put this in the use-create-table-columns.tsx file, there will be a mistake in the future if not added there
// TODO: i want the table header cell to take up as little space as possible and grow wide wihen you hover over it so it can include the other features it offers
export default function TableHeaderCustomHead(props: TableHeaderCustomHeadProps) {
    const { header, table } = props

    // don't show the vertical menu for these columns
    const hideForColumns = ["selection", "expand", "delete", "drag-row"]

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
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <TableHead
                        className={`group relative cursor-pointer whitespace-nowrap bg-accent ${
                            isPinned ? "bg-primary/30" : ""
                        }`}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        ref={setNodeRef} // for dnd column reordering
                        style={style}
                    >
                        <div className="flex items-center justify-center gap-1">
                            {/* Column header text - now with hover effect */}
                            <div className="flex items-center gap-1 text-sm transition-opacity group-hover:opacity-0">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </div>

                            {/* Overlay container for icons - appears on hover */}
                            <div className="absolute left-0 right-0 flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                {!hideForColumns.includes(header.column.id) && (
                                    <>
                                        {/* Sort direction indicator */}
                                        <TableHeaderSortIndicator isSorted={isSorted} />

                                        {/* dnd column header reordering button */}
                                        <GripVertical className="h-5 w-5" {...attributes} {...listeners} />

                                        {/* Dropdown menu for column actions */}
                                        <TableHeaderDropdownMenu header={header} />

                                        {/* Table header resizer */}
                                        {header.column.getCanResize() && (
                                            <TableHeaderResizer header={header} table={table} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </TableHead>
                </TooltipTrigger>
                <TooltipContent>{header.column.id}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
