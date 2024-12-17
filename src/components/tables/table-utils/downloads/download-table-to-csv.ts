import type { Trade } from "@/types/finance/trade"

import * as XLSX from "xlsx"

export default function downloadTableToCSV(trades: Trade[]) {
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