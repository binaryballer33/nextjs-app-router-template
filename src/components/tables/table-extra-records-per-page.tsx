import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TableExtraRecordsPerPageProps = {
    table: Table<Trade>
}

export default function TableExtraRecordsPerPage(props: TableExtraRecordsPerPageProps) {
    const { table } = props

    const { pagination } = table.getState()
    const recordsPerPage = [10, 20, 30, 40, 50, 100]

    return (
        <div className="flex items-center space-x-2 max-sm:w-full max-sm:justify-between ">
            <p className="text-xs font-medium max-sm:hidden md:text-sm">Rows per page</p>

            {/* Select the number of rows per page */}
            <Select
                onValueChange={(value) => {
                    table.setPageSize(Number(value))
                }}
                value={`${table.getState().pagination.pageSize}`}
            >
                <SelectTrigger className="h-8 w-[60px] max-sm:!ml-0 md:w-[70px]">
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

            {/* Display the current page and total pages */}
            <span className="text-xs md:text-sm">
                {pagination.pageIndex * pagination.pageSize + 1}-
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, table.getFilteredRowModel().rows.length)} of{" "}
                {table.getFilteredRowModel().rows.length}
            </span>
        </div>
    )
}
