"use client"

import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { useState } from "react"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaginationProps = {
    table: Table<Trade>
}

export default function Pagination(props: PaginationProps) {
    const { table } = props

    const recordsPerPage = [10, 20, 30, 40, 50]

    const [inputValue, setInputValue] = useState<string>(String(table.getState().pagination.pageIndex + 1))

    const handleInputBoxPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputValue(value)
        const page = Number(value)

        // Only update the actual page if it's valid
        if (!Number.isNaN(page) && page >= 1 && page <= table.getPageCount()) table.setPageIndex(page - 1)
    }

    return (
        <div className="flex items-center justify-between px-2">
            {/* Records per page option selector */}
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>

                <Select
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                    value={`${table.getState().pagination.pageSize}`}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {recordsPerPage.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <span className="text-sm">
                    {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length,
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length}
                </span>
            </div>

            {/* Manual page number input box and page number display */}
            <div className="flex items-center space-x-2">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm">Go To:</span>
                    <Input
                        className="w-[70px]"
                        // Update input value when page changes via this input box
                        onBlur={() => setInputValue(String(table.getState().pagination.pageIndex + 1))}
                        onChange={handleInputBoxPageChange}
                        type="number"
                        value={inputValue}
                    />
                </div>

                {/* Pagination buttons */}
                <div className="flex items-center space-x-2">
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
        </div>
    )
}
