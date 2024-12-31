import type { Row } from "@tanstack/react-table"

import { type ColumnFilter } from "@/types/table/filters"

import handleDateComparison from "./filter-date"
import handleNumericComparison from "./filter-numeric"
import handleStringComparison from "./filter-string"

function getColumnType(value: unknown): string {
    if (typeof value === "string" && !Number.isNaN(Date.parse(value))) return "date"
    if (typeof value === "number" || !Number.isNaN(Number(value))) return "number"
    return "string"
}

export default function customFilter(row: Row<any>, columnId: string, filterValue: ColumnFilter): boolean {
    // If no filter value, show all rows
    if (!filterValue) return true

    // Get the value from the row
    const rowValue = row.getValue(columnId)
    if (rowValue === undefined || rowValue === null) return false

    // use the column type to determine the type of filter to use
    const columnType = getColumnType(rowValue)
    if (columnType === "date") return handleDateComparison(rowValue, filterValue)
    if (columnType === "number") return handleNumericComparison(rowValue, filterValue)
    return handleStringComparison(rowValue, filterValue)
}
