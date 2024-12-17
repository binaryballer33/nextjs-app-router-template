import type { Trade } from "@/types/finance/trade"

import { type CSSProperties, Fragment } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { flexRender, type Row } from "@tanstack/react-table"

import { TableCell, TableRow } from "@/components/ui/table"

import TableBodyDetailView from "./table-body-detail-view"

type TableBodyCellProps = {
    row: Row<Trade>
}

export default function TableBodyCell(props: TableBodyCellProps) {
    const { row } = props

    // dnd sortable context for the table body cells

    const { isDragging, setNodeRef, transform, transition } = useSortable({
        data: {
            // this is needed for the dnd sortable to work, it needs to know what if its a column or row
            type: "row",
        },
        id: row.id,
    })

    // dnd sortable styles for the table body cells
    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition,
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <Fragment key={row.id}>
            <TableRow
                className={`
                    ${row.index % 2 === 1 ? "bg-black/[.33]" : ""}
                    ${row.getIsSelected() ? "bg-primary" : ""}
                    hover:bg-black/[.05]
                    [&>td]:border-r [&>td]:border-black/10
                `}
                ref={setNodeRef}
                style={style}
            >
                {/* the table body cells */}
                {row.getVisibleCells().map((cell) => (
                    <TableCell
                        key={cell.id}
                        style={{
                            minWidth: cell.column.columnDef.minSize || 0,
                            width: Math.max(cell.column.getSize(), cell.column.columnDef.minSize || 0),
                        }}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </TableRow>

            {/* if the row is expanded, display the row detail view */}
            {row.getIsExpanded() && <TableBodyDetailView row={row} trade={row.original} />}
        </Fragment>
    )
}
