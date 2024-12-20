import type { ColumnFilter } from "@/types/table/filters"

// Function to handle numeric comparisons
export default function handleNumericComparison(value: unknown, filterValue: ColumnFilter): boolean {
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
