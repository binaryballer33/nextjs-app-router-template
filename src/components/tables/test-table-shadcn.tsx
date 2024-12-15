"use client"

import { Fragment } from "react"

import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"

import TableBodyCell from "./table-body-cell"
import TableBodyDeleteIcon from "./table-body-delete-icon"
import TableBodyDetailView from "./table-body-detail-view"
import TableBodyNoRecordsFound from "./table-body-no-records-found"
import TableExportButtons from "./table-export-buttons"
import TableFooter from "./table-footer"
import TableGlobalSearchBar from "./table-global-search-bar"
import TableHeaderCell from "./table-header-cell"
import TableHeaderColumnVisibilitySelector from "./table-header-column-visibility-selector"
import TablePagination from "./table-pagination"
import TableRecordsPerPage from "./table-records-per-page"
import useTableData from "./use-create-table"

export default function DndShadCnTable() {
    const { columnIds, columnOrder, setColumnOrder, setData, tableConfig } = useTableData()

    const table = useReactTable(tableConfig)

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrderPrev) => {
                const oldIndex = columnOrderPrev.indexOf(active.id as string)
                const newIndex = columnOrderPrev.indexOf(over.id as string)
                return arrayMove(columnOrderPrev, oldIndex, newIndex) // this is just a splice util
            })
        }
    }

    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

    return (
        <div className="flex flex-col gap-2 md:p-2">
            {/* Table Controls */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 md:w-4/6">
                    {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                        <TableBodyDeleteIcon setData={setData} table={table} />
                    ) : (
                        <>
                            <TableHeaderColumnVisibilitySelector columnIds={columnIds} table={table} />
                            <TableExportButtons table={table} />
                        </>
                    )}

                    <TableGlobalSearchBar table={table} />
                </div>

                {/* Records per page option selector */}
                <TableRecordsPerPage table={table} />
            </div>

            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToHorizontalAxis]}
                // eslint-disable-next-line react/jsx-no-bind
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <div className="max-h-[525px] min-h-[525px] overflow-x-auto overflow-y-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHeaderCell header={header} key={header.id} table={table} />
                                        ))}
                                    </SortableContext>
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <Fragment key={row.id}>
                                        <TableRow
                                            className={`
                                            ${row.index % 2 === 1 ? "bg-black/[.33]" : ""}
                                            ${row.getIsSelected() ? "bg-primary" : ""}
                                            hover:bg-black/[.05]
                                            [&>td]:border-r [&>td]:border-black/10
                                        `}
                                            key={row.id}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <SortableContext
                                                    items={columnOrder}
                                                    key={cell.id}
                                                    strategy={horizontalListSortingStrategy}
                                                >
                                                    <TableBodyCell cell={cell} />
                                                </SortableContext>
                                            ))}
                                        </TableRow>

                                        {/* if the row is expanded, display the row detail view */}
                                        {row.getIsExpanded() && <TableBodyDetailView row={row} trade={row.original} />}
                                    </Fragment>
                                ))
                            ) : (
                                // if no data is found that matches the search, display this message
                                <TableBodyNoRecordsFound table={table} />
                            )}
                        </TableBody>

                        {/* Table footer */}
                        <TableFooter table={table} />
                    </Table>
                </div>
            </DndContext>

            {/* Pagination */}
            <TablePagination table={table} />
        </div>
    )
}
