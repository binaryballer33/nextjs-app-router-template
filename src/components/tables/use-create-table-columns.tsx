import type { Trade } from "@/types/finance/trade"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableHeaderCellCheckbox from "./table-header-cell-checkbox"
import TableHeaderCellDelete from "./table-header-cell-delete"
import TableHeaderCellExpand from "./table-header-cell-expand"
import TableHeaderCellRowDrag from "./table-header-cell-row-drag"
import TableHeaderCheckboxAll from "./table-header-checkbox-all"
import TableHeaderDelete from "./table-header-delete"

const columnHelper = createColumnHelper<Trade>()

export default function useCreateTableColumns() {
    const columns = useMemo(
        () => [
            columnHelper.display({
                cell: ({ row }) => <TableHeaderCellCheckbox row={row} />,
                header: ({ table }) => <TableHeaderCheckboxAll table={table} />,
                id: "selection",
            }),

            columnHelper.display({
                cell: ({ row }) => <TableHeaderCellRowDrag rowId={row.id} />,
                id: "drag-handle",
            }),

            columnHelper.display({
                cell: ({ row }) => (row.getCanExpand() ? <TableHeaderCellExpand row={row} /> : null),
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
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Date</TooltipTrigger>
                            <TooltipContent>
                                <p>Date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "date",
                minSize: 100,
            }),

            columnHelper.accessor("type", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Type</TooltipTrigger>
                            <TooltipContent>
                                <p>Type</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "type",
            }),

            columnHelper.accessor("realized", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Realized</TooltipTrigger>
                            <TooltipContent>
                                <p>Realized</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
                id: "realized",
            }),

            columnHelper.accessor("ticker", {
                enableResizing: true,
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Ticker</TooltipTrigger>
                            <TooltipContent>
                                <p>Ticker</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
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
                header: () => (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>Contracts</TooltipTrigger>
                            <TooltipContent>
                                <p>Contracts</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ),
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
                cell: ({ row, table }) => <TableHeaderCellDelete row={row} table={table} />,
                header: () => <TableHeaderDelete />,
                id: "delete",
            }),
        ],
        [],
    )

    return { columns }
}
