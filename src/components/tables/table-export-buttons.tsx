import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"
import type { ReactNode } from "react"

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
        const fileName = "trades.xlsx"

        // Create a new workbook
        const wb = XLSX.utils.book_new()

        // Convert trades to worksheet
        const ws = XLSX.utils.json_to_sheet(trades)

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Trades")

        // Save workbook as Excel file
        XLSX.writeFile(wb, fileName)
    }

    const handleExportJSON = () => {
        // Create a blob from the JSON data
        const fileName = "trades.json"
        const jsonString = JSON.stringify(trades, null, 2)
        const blob = new Blob([jsonString], { type: "application/json" })

        // Create download link
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = fileName

        // Trigger download
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const exportButtons = [
        {
            handleDownload: handleExportExcel,
            icon: <Sheet className="h-4 w-4" />,
            label: "Export to CSV",
        },
        {
            handleDownload: handleExportJSON,
            icon: <FileJson className="h-4 w-4" />,
            label: "Export to JSON",
        },
    ]

    return (
        <NavigationMenu className="z-50 w-auto hover:border-b-2 hover:border-primary">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Download className="h-6 w-6" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[120px] p-4">
                        <div className="flex flex-col items-center gap-2">
                            {exportButtons.map((button) => (
                                <TableHeaderExportButton
                                    handleDownload={button.handleDownload}
                                    icon={button.icon}
                                    key={button.label}
                                    label={button.label}
                                />
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

type TableHeaderExportButtonProps = {
    handleDownload: () => void
    icon: ReactNode
    label: string
}

function TableHeaderExportButton(props: TableHeaderExportButtonProps) {
    const { handleDownload, icon, label } = props

    return (
        <div className="flex w-[150px] items-center justify-start gap-2 whitespace-nowrap hover:text-primary">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-8 w-8 hover:border-2 hover:border-primary"
                            onClick={handleDownload}
                            size="icon"
                            variant="ghost"
                        >
                            {icon}
                            <span className="sr-only">{label}</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="whitespace-nowrap">{label}</TooltipContent>
                </Tooltip>

                <span className="whitespace-nowrap text-xs">{label}</span>
            </TooltipProvider>
        </div>
    )
}
