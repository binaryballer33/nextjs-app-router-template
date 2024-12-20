import type { Row } from "@tanstack/react-table"

import { type ColumnFilter, type FilterOperation, filterValueSchema } from "@/types/table/filters"

import handleDateComparison from "./filter-date"
import handleNumericComparison from "./filter-numeric"
import handleStringComparison from "./filter-string"

function isDateOperation(operation: FilterOperation): boolean {
    return operation === "afterDate" || operation === "beforeDate" || operation === "betweenDates"
}

export default function customFilter(row: Row<any>, columnId: string, filterValue: ColumnFilter | string): boolean {
    // If no filter value, show all rows
    if (!filterValue) return true

    // Get the value from the row
    const rowValue = row.getValue(columnId)
    if (rowValue === undefined || rowValue === null) return false

    // Handle legacy string filter
    if (typeof filterValue === "string") return String(rowValue).toLowerCase().includes(filterValue.toLowerCase())

    // Validate filter value structure using Zod
    const parseResult = filterValueSchema.safeParse(filterValue)
    if (!parseResult.success) return false

    // Handle different types of comparisons
    if (isDateOperation(filterValue.operation)) return handleDateComparison(rowValue, filterValue)

    if (filterValue.operation === "contains" || filterValue.operation === "notContains") {
        return handleStringComparison(rowValue, filterValue)
    }

    return handleNumericComparison(rowValue, filterValue)
}
