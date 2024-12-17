"use client"

import type { Trade } from "@/types/finance/trade"
import type { DragEndEvent } from "@dnd-kit/core"
import type { RowData, TableOptions } from "@tanstack/react-table"

import { useMemo, useState } from "react"

import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import { fuzzyFilter } from "./table-utils"
import { trades } from "./trade-data"
import useCreateTableColumns from "./use-create-table-columns"

// Extend the TableMeta interface from TanStack to add a removeRow function to the table meta
declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        // add a removeRow function to the table meta to delete rows from the table data state
        removeRow: (rowId: string) => void
    }
}

export default function useTableData() {
    // get table row data
    const [data, setData] = useState(trades)

    // create the table columns
    const { columns } = useCreateTableColumns()

    // get the columnIds for column visibility toggling
    const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((column) => column.id!))

    // row order for dnd row reordering
    const rowOrder = useMemo(() => {
        return data.map((row) => row.id)
    }, [data])

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

        const isColumn = active.data.current?.type === "column"
        const isRow = active.data.current?.type === "row"

        if (isColumn) {
            const oldIndex = columnOrder.indexOf(active.id.toString())
            const newIndex = columnOrder.indexOf(over.id.toString())
            setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
        } else if (isRow) {
            const oldIndex = rowOrder.indexOf(active.id.toString())
            const newIndex = rowOrder.indexOf(over.id.toString())
            setData((prev) => arrayMove(prev, oldIndex, newIndex))
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
            removeRow: (rowId: string) => {
                setData((prev) => prev.filter((row) => row.id !== rowId))
            },
        },

        // update the column order for dnd column reordering
        onColumnOrderChange: setColumnOrder,

        state: {
            columnOrder,
        },
    }

    return {
        columnOrder,
        columns,
        data,
        handleDragEnd,
        rowOrder,
        sensors,
        setData,
        tableConfig,
    }
}
