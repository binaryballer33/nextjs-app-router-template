"use client"

import type { Trade } from "@/types/finance/trade"

import { Fragment } from "react"

import { flexRender, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"

import ColumnVisibilitySelector from "./table-column-visibility-selector"
import TableGlobalSearchBar from "./table-global-search-bar"
import TableHeaderCell from "./table-header"
import TableNoRecordsFound from "./table-no-records-found"
import TablePagination from "./table-pagination"
import TableRecordsPerPage from "./table-records-per-page"
import TableRowDeleteIcon from "./table-row-delete-icon"
import RowDetailView from "./table-row-detail-view"
import useTableData from "./use-create-table"

// TODO: add table footer with summary stats
// TODO: dropdown column menu needs to have more detailed filtering options ( ge, lt, gte, lte, eq, neq, contains, not contains, etc.)
// TODO: add a button to export the table to a csv file
// TODO: add a "create new trade button"
export default function CustomTable() {
    const { columnIds, setData, tableConfig } = useTableData()
    const table = useReactTable<Trade>(tableConfig)

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

                    <TableGlobalSearchBar table={table} />
                </div>

                {/* Records per page option selector */}
                <TableRecordsPerPage table={table} />
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
                        {/* table body rows */}
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
                                    {row.getIsExpanded() && <RowDetailView row={row} trade={row.original} />}
                                </Fragment>
                            ))
                        ) : (
                            // if no data is found that matches the search, display this message
                            <TableNoRecordsFound table={table} />
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <TablePagination table={table} />
        </div>
    )
}
