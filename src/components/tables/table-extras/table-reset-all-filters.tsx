import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

type TableResetAllFiltersProps = {
    table: Table<Trade>
}

export default function TableResetAllFilters(props: TableResetAllFiltersProps) {
    const { table } = props

    const handleResetFilters = () => table.resetColumnFilters()

    return <Button onClick={handleResetFilters}>X All Filters</Button>
}
