"use client"

import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { useState } from "react"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type PaginationProps = {
    table: Table<Trade>
}

export default function TablePagination(props: PaginationProps) {
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
        //  Manual page number input box and page number display
        <div className="flex flex-col items-center space-x-2 md:flex-row md:justify-end">
            <div className="flex h-10 items-center justify-between gap-4 text-sm font-medium max-sm:w-full">
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Go To:</span>

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

            {/* Pagination buttons */}
            <div className="flex items-center justify-end space-x-2 max-sm:ml-0 max-sm:w-full max-sm:justify-around">
                <Button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.firstPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.lastPage()}
                    size="icon"
                    variant="outline"
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
