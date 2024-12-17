import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { TableCell, TableRow } from "@/components/ui/table"

type TableBodyRowNoRecordsFoundProps = {
    table: Table<Trade>
}

export default function TableBodyRowNoRecordsFound(props: TableBodyRowNoRecordsFoundProps) {
    const { table } = props

    return (
        <TableRow>
            <TableCell className="text-center" colSpan={table.getAllColumns().length}>
                No Data Found That Matches Your Search
            </TableCell>
        </TableRow>
    )
}