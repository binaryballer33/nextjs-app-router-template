"use client"

import type { Trade } from "@/types/finance/trade"

import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyCell from "./table-body-cell"
import TableBodyNoRecordsFound from "./table-body-no-records-found"
import TableExtraColumnVisibility from "./table-extra-column-visibility"
import TableExtraDeleteSelected from "./table-extra-delete-selected"
import TableExtraExportButtons from "./table-extra-export-buttons"
import TableExtraGlobalSearchBar from "./table-extra-global-search-bar"
import TableExtraPagination from "./table-extra-pagination"
import TableExtraRecordsPerPage from "./table-extra-records-per-page"
import TableFooter from "./table-footer"
import TableHeaderCell from "./table-header-cell"
import useTableData from "./use-create-table-data"

// TODO: dropdown column menu needs to have more detailed filtering options ( ge, lt, gte, lte, eq, neq, contains, not contains, etc.)
// TODO: add a "create new trade button"
// TODO: make the table header sticky
// TODO: figure out how to make the entire header surface area a tooltip trigger so when hovering over the header cell, the tooltip is visible and when hovering the header title disspears and only the icons and tooltip are visible
// TODO: add a button to reduce the padding of the table body cells for "compact, standard, expanded"
// TODO: fix css styling so that you can see the cells of the column when you are dragging the column header
export default function CustomTable() {
    const { columnOrder, handleDragEnd, rowOrder, sensors, tableConfig } = useTableData()

    const table = useReactTable<Trade>(tableConfig)

    if (!table) return null

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Table Controls */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 md:w-4/6">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableExtraDeleteSelected table={table} />
                    ) : (
                        <>
                            <TableExtraColumnVisibility columnOrder={columnOrder} table={table} />
                            <TableExtraExportButtons table={table} />
                        </>
                    )}

                    <TableExtraGlobalSearchBar table={table} />
                </div>

                {/* Records per page option selector */}
                <TableExtraRecordsPerPage table={table} />
            </div>

            {/* Table */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="max-h-[525px] min-h-[525px] overflow-x-auto overflow-y-auto rounded-md border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {/* Table header rows */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className="[&>th]:border-r [&>th]:border-black/10" key={headerGroup.id}>
                                    {/* dnd sortable context for the table header cells */}
                                    <SortableContext items={columnOrder}>
                                        {/* Table header cells */}
                                        {headerGroup.headers.map((header) => (
                                            <TableHeaderCell header={header} key={header.id} table={table} />
                                        ))}
                                    </SortableContext>
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {/* TODO: find out if SortableContext should only be wrapped around the table body row */}
                            {/* dnd sortable context for the table body cells */}
                            <SortableContext items={rowOrder}>
                                {/* table body rows */}
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => <TableBodyCell key={row.id} row={row} />)
                                ) : (
                                    // if no data is found that matches the search, display this message
                                    <TableBodyNoRecordsFound table={table} />
                                )}
                            </SortableContext>
                        </TableBody>

                        {/* Table footer */}
                        <TableFooter table={table} />
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TableExtraPagination table={table} />
        </div>
    )
}
