import type { Trade } from "@/types/finance/trade"
import type { CSSProperties } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type Cell, flexRender } from "@tanstack/react-table"

import { TableCell } from "@/components/ui/table"

type TableBodyCellProps = {
    cell: Cell<Trade, unknown>
}

export default function TableBodyCell(props: TableBodyCellProps) {
    const { cell } = props

    // dnd sortable context for the table body cells
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    // dnd sortable styles for the table body cells
    const style: CSSProperties = {
        minWidth: cell.column.columnDef.minSize || 0,
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: "width transform 0.2s ease-in-out",
        width: Math.max(cell.column.getSize(), cell.column.columnDef.minSize || 0),
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <TableCell ref={setNodeRef} style={style}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    )
}
