"use client"

import type { Trade } from "@/types/finance/trade"
import type { DragEndEvent } from "@dnd-kit/core"
import type { RowData, TableOptions } from "@tanstack/react-table"

import { useState } from "react"

import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import { trades } from "../trade-data"
import useCreateTableColumns from "../use-create-table-columns"
import { advancedFilter } from "./filters/advance-filter"
import fuzzyFilter from "./filters/fuzzy-filter"

// Extend TanStack's TableMeta interface
declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        padding: "lg" | "md" | "sm" | "xl"
        removeRow: (rowId: string) => void
        removeRows: (rowIds: string[]) => void
        setTablePadding: (padding: "lg" | "md" | "sm" | "xl") => void
    }
}

export default function useCreateTableData() {
    // get table row data
    const [data, setData] = useState(trades)

    // create the table columns
    const { columns, hideForColumns } = useCreateTableColumns()

    // get the columnIds for column visibility toggling
    const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((column) => column.id!))

    // row order for dnd row reordering
    const [rowOrder, setRowOrder] = useState<string[]>(() => data.map((row) => row.id))

    const [tablePadding, setTablePadding] = useState<"lg" | "md" | "sm" | "xl">("md")

    // sensors for dnd column reordering
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor),
    )

    // reorder row / column after using dnd
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active || !over || active.id === over.id) return

        // check if the active item is a column or a row by checking the type that was assigned using the useSortable hook
        const isColumn = active.data.current?.type === "column"
        const isRow = active.data.current?.type === "row"

        if (isColumn) {
            const oldIndex = columnOrder.indexOf(active.id.toString())
            const newIndex = columnOrder.indexOf(over.id.toString())

            // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
            setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
        } else if (isRow) {
            const oldIndex = rowOrder.indexOf(active.id.toString())
            const newIndex = rowOrder.indexOf(over.id.toString())

            // arrayMove is a function that moves an item in an array to a new index, fancy splice from dnd-kit
            setData(arrayMove(data, oldIndex, newIndex))
            setRowOrder(arrayMove(rowOrder, oldIndex, newIndex))
        }
    }

    // create the table config
    const tableConfig: TableOptions<Trade> = {
        columnResizeDirection: "ltr",
        columnResizeMode: "onChange",
        columns,

        data,

        enableRowSelection: true,

        filterFns: {
            advanced: advancedFilter,
            fuzzy: fuzzyFilter,
        },

        getCoreRowModel: getCoreRowModel(),

        // filtering for the table
        getFilteredRowModel: getFilteredRowModel(),

        // pagination for the table
        getPaginationRowModel: getPaginationRowModel(),

        // expand button for rows
        getRowCanExpand: () => true,

        // get the row id for the table, helps with smooth row reordering with dnd, without it, row dnd is more choppy
        getRowId: (row) => row.id,

        // sorting for the table
        getSortedRowModel: getSortedRowModel(),

        // global filter for the table
        globalFilterFn: fuzzyFilter,

        // handle row state deletion
        meta: {
            padding: tablePadding,
            removeRow: (rowId: string) => {
                setData((prev) => prev.filter((row) => row.id !== rowId))
            },
            removeRows: (rowIds: string[]) => {
                setData((prev) => prev.filter((row) => !rowIds.includes(row.id)))
            },
            setTablePadding: (padding: "lg" | "md" | "sm" | "xl") => {
                setTablePadding(padding)
            },
        },

        // update the column order for dnd column reordering
        onColumnOrderChange: setColumnOrder,

        state: {
            columnOrder,
        },
    }

    return { columnOrder, columns, data, handleDragEnd, hideForColumns, rowOrder, sensors, tableConfig }
}
