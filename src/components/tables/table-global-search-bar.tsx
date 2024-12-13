import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

type TableGlobalSearchBarProps = {
    table: Table<Trade>
}

export default function TableGlobalSearchBar(props: TableGlobalSearchBarProps) {
    const { table } = props

    return (
        <Input
            className="ml-2 flex-1"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search..."
        />
    )
}
