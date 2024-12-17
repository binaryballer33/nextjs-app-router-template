"use client"

import type { Trade } from "@/types/finance/trade"

import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyRowCustom from "./table-body/table-body-row-custom"
import TableBodyRowNoRecordsFound from "./table-body/table-body-row-no-records-found"
import TableExtraColumnVisibility from "./table-extras/table-extra-column-visibility"
import TableExtraDeleteSelected from "./table-extras/table-extra-delete-selected"
import TableExtraDropdownMenuSettings from "./table-extras/table-extra-dropdown-menu-settings"
import TableExtraExportButtons from "./table-extras/table-extra-export-buttons"
import TableExtraGlobalSearchBar from "./table-extras/table-extra-global-search-bar"
import TableExtraPagination from "./table-extras/table-extra-pagination"
import TableFooter from "./table-footer/table-footer"
import TableHeaderCustomHead from "./table-header/table-header-custom-head"
import useCreateTableData from "./table-utils/use-create-table-data"

// TODO: dropdown column menu needs to have more detailed filtering options ( ge, lt, gte, lte, eq, neq, contains, not contains, etc.)
// TODO: add a "create new trade button"
// TODO: make the table header sticky
// TODO: figure out how to make the entire header surface area a tooltip trigger so when hovering over the header cell, the tooltip is visible and when hovering the header title disspears and only the icons and tooltip are visible
export default function CustomTable() {
    const { columnOrder, dndContextId, handleDragEnd, rowOrder, sensors, tableConfig } = useCreateTableData()

    const table = useReactTable<Trade>(tableConfig)

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
                            <TableExtraExportButtons table={table} />
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
                                            <TableHeaderCustomHead header={header} key={header.id} table={table} />
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

                        <TableFooter table={table} />
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TableExtraPagination table={table} />
        </div>
    )
}
