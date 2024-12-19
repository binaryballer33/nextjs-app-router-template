import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

type TableHeaderCheckboxAllProps = {
    table: Table<Trade>
}

export default function TableHeaderCheckboxAll(props: TableHeaderCheckboxAllProps) {
    const { table } = props

    return (
        <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
        />
    )
}
