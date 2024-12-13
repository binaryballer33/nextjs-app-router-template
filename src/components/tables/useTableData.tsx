"use client"

import type { Trade } from "@/types/finance/trade"
import type { TableOptions } from "@tanstack/react-table"

import { useMemo, useState } from "react"

import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { fuzzyFilter } from "./table-utils"
import { trades } from "./trade-data"

const DISPLAY_COLUMN_SIZE = 100
const columnHelper = createColumnHelper<Trade>()

export default function useTableData() {
    // get table row data
    const [data, setData] = useState(trades)

    // create the table columns
    const columns = useMemo(
        () => [
            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                        />
                    </div>
                ),
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={table.getIsAllRowsSelected()}
                            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
                        />
                    </div>
                ),
                id: "selection",
            }),

            columnHelper.display({
                cell: ({ row }) =>
                    row.getCanExpand() ? (
                        <div className="flex items-center justify-center">
                            <Button
                                className="h-8 w-8"
                                onClick={row.getToggleExpandedHandler()}
                                size="icon"
                                variant="ghost"
                            >
                                {row.getIsExpanded() ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                <span className="sr-only">{row.getIsExpanded() ? "Collapse row" : "Expand row"}</span>
                            </Button>
                        </div>
                    ) : null,
                id: "expand",
            }),

            columnHelper.accessor("id", {
                header: "ID",
                id: "id",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("date", {
                header: "Date",
                id: "date",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("ticker", {
                header: "Ticker",
                id: "ticker",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("type", {
                header: "Type",
                id: "type",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("strike", {
                header: "Strike",
                id: "strike",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("profitLoss", {
                header: "Profit / Loss",
                id: "profitLoss",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("realized", {
                header: "Realized",
                id: "realized",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("sellToOpen", {
                header: "Sell To Open",
                id: "sellToOpen",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("buyToClose", {
                header: "Buy To Close",
                id: "buyToClose",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("contracts", {
                header: "Contracts",
                id: "contracts",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.accessor("profitLossPercentage", {
                header: "Profit / Loss %",
                id: "profitLossPercentage",
                size: DISPLAY_COLUMN_SIZE,
            }),

            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Button
                            className="h-8 w-8 text-destructive hover:text-destructive/90"
                            onClick={() =>
                                setData((prevData) => prevData.filter((trade) => trade.id !== row.original.id))
                            }
                            size="icon"
                            variant="ghost"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete row</span>
                        </Button>
                    </div>
                ),
                header: () => (
                    <div className="flex items-center justify-center">
                        <Trash2 className="h-4 w-4" />
                    </div>
                ),
                id: "delete",
            }),
        ],
        [],
    )

    // get the column ids for column visibility changes and column ordering
    const columnIds = useMemo(() => columns.map((column) => column.id) as string[], [columns])

    // get the initial column visibility
    const columnVisibility = useMemo(() => {
        return columnIds.reduce((acc: { [id: string]: boolean }, val) => {
            acc[val] = true
            return acc
        }, {})
    }, [columnIds])

    // create the table config
    const tableConfig: TableOptions<Trade> = {
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
            columnOrder: columnIds,
            columnVisibility,
        },
    }

    return { columnIds, columns, tableConfig }
}
