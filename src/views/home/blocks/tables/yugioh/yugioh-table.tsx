"use client"

import type { YugiohCard } from "@prisma/client"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-yugioh-table-columns"
import YugiohExpandRowDetail from "./yugioh-expand-row-detail"

interface YugiohTableProps {
    yugiohCards: YugiohCard[]
}

export default function YugiohTable(props: YugiohTableProps) {
    const { yugiohCards } = props

    const { columns, hideForColumns } = useCreateTableColumns()

    return (
        <CustomTable
            columns={columns as any}
            data={yugiohCards as any}
            expandRowDetailComponent={YugiohExpandRowDetail as any}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
