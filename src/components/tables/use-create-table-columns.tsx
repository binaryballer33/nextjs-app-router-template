import type { Trade } from "@/types/finance/trade"
import type { Dispatch, SetStateAction } from "react"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { Minus, Plus, Trash2 } from "lucide-react"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const columnHelper = createColumnHelper<Trade>()

export default function useCreateTableColumns(setData: Dispatch<SetStateAction<Trade[]>>) {
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
        [setData],
    )

    return { columns }
}
