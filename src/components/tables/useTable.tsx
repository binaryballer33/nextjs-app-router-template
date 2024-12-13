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

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { fuzzyFilter } from "./table-utils"
import { trades } from "./trade-data"

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

            columnHelper.accessor("date", {
                cell: ({ row }) => {
                    const { date } = row.original
                    const dayjsDate = getDayJsDateWithPlugins(date).format("ddd, MMM D, YYYY")

                    return (
                        <TooltipProvider delayDuration={500}>
                            <Tooltip>
                                <TooltipTrigger>{date.toString()}</TooltipTrigger>
                                <TooltipContent>
                                    <p>{dayjsDate}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                },
                enableResizing: true,
                header: "Date",
                id: "date",
                minSize: 100,
            }),

            columnHelper.accessor("type", {
                enableResizing: true,
                header: "Type",
                id: "type",
            }),

            columnHelper.accessor("realized", {
                enableResizing: true,
                header: "Realized",
                id: "realized",
            }),

            columnHelper.accessor("ticker", {
                enableResizing: true,
                header: "Ticker",
                id: "ticker",
            }),

            columnHelper.accessor("strike", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Strike</TooltipTrigger>
                            <TooltipContent>
                                <p>Strike Price</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "strike",
            }),

            columnHelper.accessor("contracts", {
                enableResizing: true,
                header: "Contracts",
                id: "contracts",
            }),

            columnHelper.accessor("sellToOpen", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>STO</TooltipTrigger>
                            <TooltipContent>
                                <p>Sell To Open</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "sellToOpen",
            }),

            columnHelper.accessor("buyToClose", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>BTC</TooltipTrigger>
                            <TooltipContent>
                                <p>Buy To Close</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "buyToClose",
            }),

            columnHelper.accessor("profitLoss", {
                cell: ({ row }) => {
                    const { profitLoss } = row.original
                    return <div className={profitLoss > 0 ? "text-green-500" : "text-red-500"}>{profitLoss}</div>
                },
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>P & L</TooltipTrigger>
                            <TooltipContent>
                                <p>Profit Loss</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "profitLoss",
            }),

            columnHelper.accessor("profitLossPercentage", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>P & L %</TooltipTrigger>
                            <TooltipContent>
                                <p>Profit Loss Percentage</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "profitLossPercentage",
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
            columnOrder: columnIds,
            columnVisibility,
        },
    }

    return { columnIds, columns, tableConfig }
}
