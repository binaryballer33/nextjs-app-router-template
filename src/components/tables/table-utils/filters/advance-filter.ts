import type { FilterFn, Row } from "@tanstack/react-table"

export type FilterOperation =
    | "afterDate"
    | "beforeDate"
    | "betweenDates"
    | "contains"
    | "eq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "neq"
    | "notContains"

export type ColumnFilter = {
    endDate?: string
    operation: FilterOperation
    value: number | string
}

export const advancedFilter: FilterFn<any> = (
    row: Row<any>,
    columnId: string,
    filterValue: ColumnFilter | string,
): boolean => {
    // If no filter value, return true to show all rows
    if (!filterValue) return true

    // Handle string filter value (for backward compatibility with default filtering)
    if (typeof filterValue === "string") {
        const value = row.getValue(columnId)
        return String(value).toLowerCase().includes(filterValue.toLowerCase())
    }

    const value = row.getValue(columnId)
    const { endDate, operation, value: filterVal } = filterValue

    // Handle null/undefined values
    if (value === undefined || value === null) {
        return false
    }

    // Date operations
    if (operation === "afterDate" || operation === "beforeDate" || operation === "betweenDates") {
        const rawValue = value as Date | number | string
        if (typeof rawValue !== "string" && typeof rawValue !== "number" && !(rawValue instanceof Date)) {
            return false
        }
        const dateValue = new Date(rawValue)
        const filterDate = new Date(filterVal)

        if (Number.isNaN(dateValue.getTime())) return false

        switch (operation) {
            case "afterDate":
                return dateValue >= filterDate
            case "beforeDate":
                return dateValue <= filterDate
            case "betweenDates":
                if (!endDate) return false
                const endDateTime = new Date(endDate)
                return dateValue >= filterDate && dateValue <= endDateTime
            default:
                return true
        }
    }

    // Convert values to numbers for numeric comparisons if both are numeric
    const shouldCompareAsNumbers = !Number.isNaN(Number(value)) && !Number.isNaN(Number(filterVal))
    const numValue = shouldCompareAsNumbers ? Number(value) : value
    const numFilterVal = shouldCompareAsNumbers ? Number(filterVal) : filterVal

    switch (operation) {
        case "gt":
            return shouldCompareAsNumbers && numValue > numFilterVal
        case "lt":
            return shouldCompareAsNumbers && numValue < numFilterVal
        case "gte":
            return shouldCompareAsNumbers && numValue >= numFilterVal
        case "lte":
            return shouldCompareAsNumbers && numValue <= numFilterVal
        case "eq":
            return shouldCompareAsNumbers ? numValue === numFilterVal : value === filterVal
        case "neq":
            return shouldCompareAsNumbers ? numValue !== numFilterVal : value !== filterVal
        case "contains":
            return String(value).toLowerCase().includes(String(filterVal).toLowerCase())
        case "notContains":
            return !String(value).toLowerCase().includes(String(filterVal).toLowerCase())
        default:
            return true
    }
}
