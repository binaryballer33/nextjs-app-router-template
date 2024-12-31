"use client"

import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"

import CustomTable from "@/components/tables/table"

import useCreateTableColumns from "./use-create-yugioh-table-columns"
import YugiohExpandRowDetail from "./yugioh-expand-row-detail"

type YugiohTableProps = {
    yugiohCards: YuGiOhCard[]
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
