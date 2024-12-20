import type { ColumnFilter } from "@/types/table/filters"

import { dateValueSchema } from "@/types/table/filters"

import dayjs from "dayjs"

// Function to handle date comparisons using dayjs
export default function handleDateComparison(value: unknown, filterValue: ColumnFilter): boolean {
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
