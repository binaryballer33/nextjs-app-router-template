"use client"

import type { Trade } from "@/types/finance/trade"

import { Fragment } from "react"

import { flexRender, useReactTable } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"

import ColumnVisibilitySelector from "./table-column-visibility-selector"
import TableHeaderCell from "./table-header"
import TablePagination from "./table-pagination"
import TableRowDeleteIcon from "./table-row-delete-icon"
import RowDetailView from "./table-row-detail-view"
import useTableData from "./use-create-table"

// TODO: add table footer with summary stats
// TODO: dropdown column menu needs to have more detailed filtering options ( ge, lt, gte, lte, eq, neq, contains, not contains, etc.)
// TODO: add a button to export the table to a csv file
// TODO: add a "create new trade button"
export default function CustomTable() {
    const { columnIds, setData, tableConfig } = useTableData()

    const recordsPerPage = [10, 20, 30, 40, 50]

    const table = useReactTable<Trade>(tableConfig)
    const { pagination } = table.getState()

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Table Controls */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 md:w-4/6">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableRowDeleteIcon setData={setData} table={table} />
                    ) : (
                        <ColumnVisibilitySelector columnIds={columnIds} table={table} />
                    )}

                    <Input
                        className="ml-2 flex-1"
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </div>

                {/* Records per page option selector */}
                <div className="flex items-center space-x-2">
                    <p className="text-xs font-medium md:text-sm">Rows per page</p>

                    <Select
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                        value={`${table.getState().pagination.pageSize}`}
                    >
                        <SelectTrigger className="h-8 w-[60px] md:w-[70px] ">
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

                    <span className="text-xs md:text-sm">
                        {pagination.pageIndex * pagination.pageSize + 1}-
                        {Math.min(
                            (pagination.pageIndex + 1) * pagination.pageSize,
                            table.getFilteredRowModel().rows.length,
                        )}{" "}
                        of {table.getFilteredRowModel().rows.length}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="max-h-[525px] min-h-[525px] overflow-x-auto overflow-y-auto rounded-md border">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                        {/* Table header rows */}
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {/* Table header cells */}
                                {headerGroup.headers.map((header) => (
                                    <TableHeaderCell header={header} key={header.id} table={table} />
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        className={`
                                            ${row.getIsSelected() ? "bg-muted" : ""}
                                            ${row.index % 2 === 1 ? "bg-black/[.33]" : ""}
                                            hover:bg-black/[.05]
                                            [&>td]:border-r [&>td]:border-black/10
                                        `}
                                        data-state={row.getIsSelected() ? "selected" : null}
                                    >
                                        {/* get the table records and display them in the table */}
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    minWidth: cell.column.columnDef.minSize || 0,
                                                    width: Math.max(
                                                        cell.column.getSize(),
                                                        cell.column.columnDef.minSize || 0,
                                                    ),
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {/* if the row is expanded, display the row detail view */}
                                    {row.getIsExpanded() && (
                                        <TableRow>
                                            <TableCell colSpan={row.getVisibleCells().length}>
                                                <RowDetailView trade={row.original} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))
                        ) : (
                            // if no data is found that matches the search, display this message
                            <TableRow>
                                <TableCell className="text-center" colSpan={table.getAllColumns().length}>
                                    No Data Found That Matches Your Search
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <TablePagination table={table} />
        </div>
    )
}
