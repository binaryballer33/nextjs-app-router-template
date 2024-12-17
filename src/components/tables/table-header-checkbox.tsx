import type { Trade } from "@/types/finance/trade"
import type { Row } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

type TableHeaderCheckboxProps = {
    row: Row<Trade>
}

export default function TableHeaderCheckbox(props: TableHeaderCheckboxProps) {
    const { row } = props

    return (
        <div className="flex items-center justify-center">
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(checked) => row.toggleSelected(!!checked)} />
        </div>
    )
}
