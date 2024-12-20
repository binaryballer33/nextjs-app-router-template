"use client"

import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table" // needed for table body level scope DnD setup
import { type CSSProperties } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender } from "@tanstack/react-table"

import { TableHead } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableHeaderDragColumn from "./table-header-drag-column"
import TableHeaderDropdownMenu from "./table-header-dropdown-menu"
import TableHeaderColumnFilter from "./table-header-filter/table-header-column-filter"
import TableHeaderResizer from "./table-header-resizer"
import TableHeaderSortIndicator from "./table-header-sort-indicator"

type TableHeaderCustomHeadProps = {
    header: Header<Trade, unknown>
    hideForColumns: string[]
    table: Table<Trade>
}

export default function TableHeaderCustomHead(props: TableHeaderCustomHeadProps) {
    const { header, hideForColumns, table } = props

    const isPinned = header.column.getIsPinned()

    // Add this function to check if any column is being resized
    const isAnyColumnResizing = table.getState().columnSizingInfo.isResizingColumn

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
                        ref={setNodeRef} // for dnd column reordering
                        style={style}
                    >
                        <div className="flex items-center justify-center gap-1">
                            {/* Column header text */}
                            <div
                                className={`flex items-center gap-1 text-sm ${
                                    !hideForColumns.includes(header.column.id)
                                        ? "transition-opacity group-hover:opacity-0"
                                        : ""
                                }`}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </div>

                            {/* Overlay container for icons - appears on hover */}
                            <div className="absolute left-0 right-0 flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                {!hideForColumns.includes(header.column.id) && !isAnyColumnResizing && (
                                    <div className="flex w-full items-center justify-between gap-2 px-2 max-sm:gap-1  max-sm:pr-1">
                                        {/* dnd column header reordering button */}
                                        <TableHeaderDragColumn attributes={attributes} listeners={listeners} />

                                        {/* Sort direction indicator */}
                                        <TableHeaderSortIndicator header={header} />

                                        {/* Column filter */}
                                        <TableHeaderColumnFilter header={header} />

                                        {/* Dropdown menu for column actions */}
                                        <TableHeaderDropdownMenu header={header} />

                                        {/* Table header resizer */}
                                        <TableHeaderResizer header={header} />
                                    </div>
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
