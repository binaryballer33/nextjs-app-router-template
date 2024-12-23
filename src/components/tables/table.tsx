"use client"

import type { Trade } from "@/types/finance/trade"

import { useMemo } from "react"

import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyRowCustom from "./table-body/table-body-row-custom"
import TableBodyRowNoRecordsFound from "./table-body/table-body-row-no-records-found"
import TableDemoStats from "./table-demo-stats"
import TableExtraColumnVisibility from "./table-extras/table-extra-column-visibility"
import TableExtraDeleteSelected from "./table-extras/table-extra-delete-selected"
import TableExtraDropdownMenuSettings from "./table-extras/table-extra-dropdown-menu-settings"
import TableExtraGlobalSearchBar from "./table-extras/table-extra-global-search-bar"
import TableExtraPagination from "./table-extras/table-extra-pagination"
import TableHeaderCustomHead from "./table-header/table-header-custom-head"
import useResetColumnFilters from "./table-utils/hooks/use-reset-column-filters"
import useCreateTableData from "./table-utils/use-create-table-data"

// TODO: make the table resuable and customizable, table height, weight, records per page, default records per page, columns, data, etc
// TODO: add a "create new trade button"
export default function CustomTable() {
    const { columnOrder, handleDragEnd, hideForColumns, rowOrder, sensors, tableConfig } = useCreateTableData()

    const table = useReactTable<Trade>(tableConfig)

    // Add a stable ID for DnD context to prevent hydration errors and aria describe errors
    const dndContextId = useMemo(() => "table-dnd-context", [])

    // clear all the table column filters when the table is mounted
    useResetColumnFilters(table)

    if (!table) return null

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Extra table features */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 max-sm:gap-2 md:w-full">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableExtraDeleteSelected table={table} />
                    ) : (
                        <>
                            <TableExtraColumnVisibility columnOrder={columnOrder} table={table} />
                            <TableExtraDropdownMenuSettings table={table} />
                        </>
                    )}

                    <TableExtraGlobalSearchBar table={table} />
                </div>
            </div>

            {/* dnd context to allow reordering of the table rows and columns */}
            <DndContext
                collisionDetection={closestCenter}
                id={dndContextId}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                {/* table container */}
                <div className="relative max-h-[525px] min-h-[525px] overflow-x-auto overflow-y-auto rounded-md border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {/* Table header rows */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className="[&>th]:border-r [&>th]:border-black/10" key={headerGroup.id}>
                                    {/* dnd sortable context for the table header cells */}
                                    <SortableContext items={columnOrder}>
                                        {/* Table header cells */}
                                        {headerGroup.headers.map((header) => (
                                            <TableHeaderCustomHead
                                                header={header}
                                                hideForColumns={hideForColumns}
                                                key={header.id}
                                                table={table}
                                            />
                                        ))}
                                    </SortableContext>
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {/* dnd sortable context for the table rows */}
                            {table.getRowModel().rows.length ? (
                                <SortableContext items={rowOrder}>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableBodyRowCustom key={row.id} row={row} table={table} />
                                    ))}
                                </SortableContext>
                            ) : (
                                // if no data is found that matches the search, display this message
                                <TableBodyRowNoRecordsFound table={table} />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TableExtraPagination table={table} />
            <TableDemoStats table={table} />
        </div>
    )
}
