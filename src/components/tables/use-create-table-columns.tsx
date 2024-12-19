import type { Trade } from "@/types/finance/trade"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableHeaderCellCheckbox from "./table-header/table-header-cell-checkbox"
import TableHeaderCellDelete from "./table-header/table-header-cell-delete"
import TableHeaderCellExpand from "./table-header/table-header-cell-expand"
import TableHeaderCellRowDrag from "./table-header/table-header-cell-row-drag"
import TableHeaderCheckboxAll from "./table-header/table-header-checkbox-all"
import TableHeaderDelete from "./table-header/table-header-delete"

const columnHelper = createColumnHelper<Trade>()

export default function useCreateTableColumns() {
    const columns = useMemo(
        () => [
            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <TableHeaderCellCheckbox row={row} />
                    </div>
                ),
                footer: (props) => props.column.id,
                header: ({ table }) => (
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <TableHeaderCheckboxAll table={table} />
                    </div>
                ),
                id: "selection",
                maxSize: 50,
            }),

            columnHelper.display({
                cell: ({ row }) => <TableHeaderCellRowDrag rowId={row.id} />,
                footer: (props) => props.column.id,
                id: "drag-row",
                maxSize: 30,
            }),

            columnHelper.display({
                cell: ({ row }) => (row.getCanExpand() ? <TableHeaderCellExpand row={row} /> : null),
                footer: (props) => props.column.id,
                id: "expand",
                maxSize: 30,
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
                footer: (props) => props.column.id,
                header: () => <span>Date</span>,
                id: "Date",
                minSize: 100,
            }),

            columnHelper.accessor("type", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>Type</span>,
                id: "Type",
            }),

            columnHelper.accessor("realized", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>Realized</span>,
                id: "Realized",
            }),

            columnHelper.accessor("ticker", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>Ticker</span>,
                id: "Ticker",
            }),

            columnHelper.accessor("strike", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>Strike</span>,
                id: "Strike Price",
            }),

            columnHelper.accessor("contracts", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>Contracts</span>,
                id: "Contracts",
            }),

            columnHelper.accessor("sellToOpen", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>STO</span>,
                id: "Sell To Open",
            }),

            columnHelper.accessor("buyToClose", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>BTC</span>,
                id: "Buy To Close",
            }),

            columnHelper.accessor("profitLoss", {
                cell: ({ row }) => {
                    const { profitLoss } = row.original
                    return <div className={profitLoss > 0 ? "text-green-500" : "text-red-500"}>{profitLoss}</div>
                },
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>P / L</span>,
                id: "Profit / Loss",
            }),

            columnHelper.accessor("profitLossPercentage", {
                enableResizing: true,
                footer: (props) => props.column.id,
                header: () => <span>P / L %</span>,
                id: "Profit / Loss %",
            }),

            columnHelper.display({
                cell: ({ row, table }) => <TableHeaderCellDelete row={row} table={table} />,
                footer: (props) => props.column.id,
                header: () => <TableHeaderDelete />,
                id: "delete",
            }),
        ],
        [],
    )

    return { columns }
}
