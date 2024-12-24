"use client"

import { trades } from "@/views/home/blocks/table/trade-data"
import useCreateTableColumns from "@/views/home/blocks/table/use-create-table-columns"

import CustomTable from "@/components/tables/table"

export default function TradesTable() {
    const { columns, hideForColumns } = useCreateTableColumns()

    return (
        <CustomTable
            columns={columns}
            data={trades}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
