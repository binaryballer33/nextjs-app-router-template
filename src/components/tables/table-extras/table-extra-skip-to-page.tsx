import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { useState } from "react"

import { Input } from "@/components/ui/input"

type TableExtraSkipToPageProps = {
    table: Table<Trade>
}

export default function TableExtraSkipToPage(props: TableExtraSkipToPageProps) {
    const { table } = props

    const [inputValue, setInputValue] = useState<string>(String(table.getState().pagination.pageIndex + 1))

    const handleInputBoxPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputValue(value)
        const page = Number(value)

        // Only update the actual page if it's valid
        if (!Number.isNaN(page) && page >= 1 && page <= table.getPageCount()) table.setPageIndex(page - 1)
    }

    return (
        <div className="flex h-10 items-center justify-between gap-4 text-sm font-medium max-sm:w-full max-sm:justify-end">
            <div className="flex items-center justify-center gap-1">
                <span className="text-sm max-sm:hidden">Page</span>
                <span>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm max-sm:hidden">Go To:</span>

                {/* Manual page number input box and page number display */}
                <Input
                    className="w-[70px] max-sm:w-[35px] max-sm:p-0"
                    // Update input value when page changes via this input box
                    onBlur={() => setInputValue(String(table.getState().pagination.pageIndex + 1))}
                    onChange={handleInputBoxPageChange}
                    type="number"
                    value={inputValue}
                />
            </div>
        </div>
    )
}