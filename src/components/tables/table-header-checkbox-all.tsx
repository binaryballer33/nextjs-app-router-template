import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TableHeaderCheckboxAllProps = {
    table: Table<Trade>
}

export default function TableHeaderCheckboxAll(props: TableHeaderCheckboxAllProps) {
    const { table } = props

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <Checkbox
                            checked={table.getIsAllRowsSelected()}
                            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Select all</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
