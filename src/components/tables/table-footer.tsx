import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { TableFooter as ShadcnTableFooter, TableCell, TableRow } from "@/components/ui/table"

type TableFooterProps = {
    table: Table<Trade>
}

export default function TableFooter({ table }: TableFooterProps) {
    // Get all rows that match current filters
    const filteredRows = table.getFilteredRowModel().rows
    const trades = filteredRows.map((row) => row.original)

    // Calculate summary statistics
    const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0)
    const tradeCount = trades.length
    const averageProfitLoss = tradeCount > 0 ? totalProfitLoss / tradeCount : 0

    return (
        <ShadcnTableFooter className="sticky bottom-0 bg-background">
            <TableRow className="whitespace-nowrap hover:bg-background">
                {/* Checkbox column */}
                <TableCell />

                {/* Expand column */}
                <TableCell />

                {/* Stats cells */}
                <TableCell>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">Total P&L:</span>
                        <span className={totalProfitLoss > 0 ? "text-green-600" : "text-red-600"}>
                            ${totalProfitLoss.toFixed(2)}
                        </span>
                    </div>
                </TableCell>

                <TableCell>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">Avg P&L:</span>
                        <span className={averageProfitLoss > 0 ? "text-green-600" : "text-red-600"}>
                            ${averageProfitLoss.toFixed(2)}
                        </span>
                    </div>
                </TableCell>

                {/* Expand column */}
                <TableCell>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">Trade Count:</span>
                        <span className="text-muted-foreground">{tradeCount}</span>
                    </div>
                </TableCell>
            </TableRow>
        </ShadcnTableFooter>
    )
}
