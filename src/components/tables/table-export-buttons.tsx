import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Download, FileJson, Sheet } from "lucide-react"
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TableExportButtonsProps = {
    table: Table<Trade>
}

export default function TableExportButtons(props: TableExportButtonsProps) {
    const { table } = props

    // Get all rows that match current filters
    const filteredRows = table.getFilteredRowModel().rows
    const trades = filteredRows.map((row) => row.original)

    const handleExportExcel = () => {
        // Create a new workbook
        const wb = XLSX.utils.book_new()

        // Convert trades to worksheet
        const ws = XLSX.utils.json_to_sheet(trades)

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Trades")

        // Save workbook as Excel file
        XLSX.writeFile(wb, "trades.xlsx")
    }

    const handleExportJSON = () => {
        // Create a blob from the JSON data
        const jsonString = JSON.stringify(trades, null, 2)
        const blob = new Blob([jsonString], { type: "application/json" })

        // Create download link
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "trades.json"

        // Trigger download
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <NavigationMenu className="z-50 w-auto hover:border-b-2 hover:border-primary">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Download className="h-6 w-6" />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="min-w-[120px] p-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                className="h-8 w-8"
                                                onClick={handleExportExcel}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Sheet className="h-4 w-4" />
                                                <span className="sr-only">Export to Excel</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="whitespace-nowrap">Export to Excel</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <span className="whitespace-nowrap text-xs">Download CSV</span>
                                </TooltipProvider>
                            </div>

                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                className="h-8 w-8"
                                                onClick={handleExportJSON}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <FileJson className="h-4 w-4" />
                                                <span className="sr-only">Export to JSON</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="whitespace-nowrap">Export to JSON</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <span className="whitespace-nowrap text-xs">Download JSON</span>
                                </TooltipProvider>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
