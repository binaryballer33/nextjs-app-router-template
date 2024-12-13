import type { Trade } from "@/types/finance/trade"

import { type Cell, flexRender } from "@tanstack/react-table"

import { TableCell } from "@/components/ui/table"

type TableBodyCellProps = {
    cell: Cell<Trade, unknown>
}

export default function TableBodyCell(props: TableBodyCellProps) {
    const { cell } = props

    return (
        <TableCell
            key={cell.id}
            style={{
                minWidth: cell.column.columnDef.minSize || 0,
                width: Math.max(cell.column.getSize(), cell.column.columnDef.minSize || 0),
            }}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    )
}
