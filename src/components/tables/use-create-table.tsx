"use client"

import type { Trade } from "@/types/finance/trade"
import type { TableOptions } from "@tanstack/react-table"

import { useMemo, useState } from "react"

import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import { fuzzyFilter } from "./table-utils"
import { trades } from "./trade-data"
import useCreateTableColumns from "./use-create-table-columns"

export default function useTableData() {
    // get table row data
    const [data, setData] = useState(trades)

    // create the table columns
    const { columns } = useCreateTableColumns(setData)

    // get the column ids for column visibility changes
    const columnIds = useMemo(() => columns.map((column) => column.id) as string[], [columns])

    // get the initial column visibility
    const columnVisibility = useMemo(() => {
        return columnIds.reduce((acc: { [id: string]: boolean }, val) => {
            acc[val] = true
            return acc
        }, {})
    }, [columnIds])

    // get the initial column order for dnd column reordering
    const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.id!))

    // create the table config
    const tableConfig: TableOptions<Trade> = {
        columnResizeDirection: "ltr",
        columnResizeMode: "onChange",
        columns,

        data,

        enableRowSelection: true,

        filterFns: {
            fuzzy: fuzzyFilter,
        },

        getCoreRowModel: getCoreRowModel(),

        // filtering for the table
        getFilteredRowModel: getFilteredRowModel(),

        // pagination for the table
        getPaginationRowModel: getPaginationRowModel(),

        // expand button for rows
        getRowCanExpand: () => true,

        // sorting for the table
        getSortedRowModel: getSortedRowModel(),

        // global filter for the table
        globalFilterFn: fuzzyFilter,

        // initial state for the table
        initialState: {
            columnVisibility,
        },

        // update the column order for dnd column reordering
        onColumnOrderChange: setColumnOrder,

        state: {
            columnOrder,
        },
    }

    return { columnIds, columnOrder, columns, data, setColumnOrder, setData, tableConfig }
}
