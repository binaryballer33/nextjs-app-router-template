"use client"

import { trades } from "@/views/home/blocks/tables/trades/trade-data"

import CustomTable from "@/components/tables/table"

import TradeExpandRowDetail from "./trade-expand-row-detail"
import useCreateTradeTableColumns from "./use-create-trade-table-columns"

export default function TradeTable() {
    const { columns, hideForColumns } = useCreateTradeTableColumns()

    return (
        <CustomTable
            columns={columns}
            data={trades}
            expandRowDetailComponent={TradeExpandRowDetail}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
