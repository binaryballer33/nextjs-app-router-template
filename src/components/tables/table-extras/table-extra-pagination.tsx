"use client"

import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import TableExtraRecordsPerPage from "./table-extra-records-per-page"
import TableExtraSkipToPage from "./table-extra-skip-to-page"

type TableExtraPaginationProps = {
    table: Table<Trade>
}

export default function TableExtraPagination(props: TableExtraPaginationProps) {
    const { table } = props

    return (
        <div className="flex flex-col items-center space-x-2 md:flex-row md:justify-between">
            {/* Records per page option selector */}
            <div className="flex w-full gap-2 md:justify-between">
                <TableExtraRecordsPerPage table={table} />
                <TableExtraSkipToPage table={table} />
            </div>

            {/* Pagination buttons */}
            <div className="flex flex-col items-center justify-end space-x-2 max-sm:ml-0 max-sm:mt-2 max-sm:w-full max-sm:justify-around md:flex-row md:space-x-8">
                <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
                    <Button
                        className="max-sm:!w-16"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.firstPage()}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="w-4 md:h-4" />
                    </Button>

                    <Button
                        className="max-sm:!w-16"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="w-4 md:h-4" />
                    </Button>

                    <Button
                        className="max-sm:!w-16"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="w-4 md:h-4" />
                    </Button>

                    <Button
                        className="max-sm:!w-16"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.lastPage()}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="w-4 md:h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
