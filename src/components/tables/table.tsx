"use client"

import type { Trade } from "@/types/finance/trade"

import { Fragment } from "react"

import { flexRender, useReactTable } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"

import ColumnVisibilitySelector from "./table-column-visibility-selector"
import TableHeaderCell from "./table-header"
import Pagination from "./table-pagination"
import RowDetailView from "./table-row-detail-view"
import useTableData from "./useTableData"

export default function CustomTable() {
    const { columnIds, tableConfig } = useTableData()
    const table = useReactTable<Trade>(tableConfig)

    return (
        <div className="h-[98vh] w-screen">
            <div className="flex h-full flex-col gap-2 p-2">
                {/* Table Controls */}
                <div className="flex items-center">
                    <ColumnVisibilitySelector columnIds={columnIds} table={table} />
                    <Input
                        className="ml-2 w-[300px]"
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto rounded-md border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {/* Table header rows */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {/* Table header cells */}
                                    {headerGroup.headers.map((header) => (
                                        <TableHeaderCell header={header} key={header.id} />
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        className={row.getIsSelected() ? "bg-muted" : undefined}
                                        data-state={row.getIsSelected() ? "selected" : null}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {row.getIsExpanded() && (
                                        <TableRow>
                                            <TableCell colSpan={row.getVisibleCells().length}>
                                                <RowDetailView trade={row.original} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination table={table} />
            </div>
        </div>
    )
}
