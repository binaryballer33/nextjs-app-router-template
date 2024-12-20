import type { FilterFn, Row } from "@tanstack/react-table"

import dayjs from "dayjs"
import { z } from "zod"

// Define all possible filter operations
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

// Zod schema for validating filter values
const dateValueSchema = z.union([z.string(), z.number(), z.date()])
const filterValueSchema = z.object({
    endDate: z.string().optional(),
    operation: z.enum([
        "afterDate",
        "beforeDate",
        "betweenDates",
        "contains",
        "eq",
        "gt",
        "gte",
        "lt",
        "lte",
        "neq",
        "notContains",
    ]),
    value: z.union([z.string(), z.number()]),
})

export type ColumnFilter = z.infer<typeof filterValueSchema>

// Function to handle date comparisons using dayjs
const handleDateComparison = (value: unknown, filterValue: ColumnFilter): boolean => {
    // Validate the input value using Zod
    const parseResult = dateValueSchema.safeParse(value)
    if (!parseResult.success) return false

    // Convert the row's date value to a dayjs object
    const rowDateValue = dayjs(parseResult.data)

    // Convert the filter's date value to a dayjs object
    const filterDate = dayjs(filterValue.value)

    // Check if the date is valid
    if (!rowDateValue.isValid()) return false

    // Perform the appropriate date comparison
    switch (filterValue.operation) {
        case "afterDate":
            return rowDateValue.isAfter(filterDate) || rowDateValue.isSame(filterDate)
        case "beforeDate":
            return rowDateValue.isBefore(filterDate) || rowDateValue.isSame(filterDate)
        case "betweenDates": {
            if (!filterValue.endDate) return false
            const endDateTime = dayjs(filterValue.endDate)
            return rowDateValue.isAfter(filterDate) && rowDateValue.isBefore(endDateTime)
        }
        default:
            return true
    }
}

// Function to handle numeric comparisons
const handleNumericComparison = (value: unknown, filterValue: ColumnFilter): boolean => {
    // the value from the row
    const rowNumValue = Number(value)

    // the value from the filter
    const numFilterVal = Number(filterValue.value)

    const isNumeric = !Number.isNaN(rowNumValue) && !Number.isNaN(numFilterVal)
    if (!isNumeric) return false

    // Perform the appropriate numeric comparison
    switch (filterValue.operation) {
        case "gt":
            return rowNumValue > numFilterVal
        case "lt":
            return rowNumValue < numFilterVal
        case "gte":
            return rowNumValue >= numFilterVal
        case "lte":
            return rowNumValue <= numFilterVal
        case "eq":
            return rowNumValue === numFilterVal
        case "neq":
            return rowNumValue !== numFilterVal
        default:
            return false
    }
}

// Function to handle string comparisons
const handleStringComparison = (value: unknown, filterValue: ColumnFilter): boolean => {
    // the value from the row
    const rowStringValue = String(value).toLowerCase()

    // the value from the filter
    const filterVal = String(filterValue.value).toLowerCase()

    // Perform the appropriate string comparison
    switch (filterValue.operation) {
        case "contains":
            return rowStringValue.includes(filterVal)
        case "notContains":
            return !rowStringValue.includes(filterVal)
        default:
            return false
    }
}

// Helper function to check if the operation is a date operation
const isDateOperation = (operation: FilterOperation) =>
    operation === "afterDate" || operation === "beforeDate" || operation === "betweenDates"

// Main filter function
export const advancedFilter: FilterFn<any> = (
    row: Row<any>,
    columnId: string,
    filterValue: ColumnFilter | string,
): boolean => {
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
