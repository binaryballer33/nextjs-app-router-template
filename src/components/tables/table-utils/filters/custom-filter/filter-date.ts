import type { ColumnFilter } from "@/types/table/filters"

import { dateValueSchema } from "@/types/table/filters"

import dayjs from "dayjs"

// Function to handle date comparisons using dayjs
export default function handleDateComparison(value: unknown, filterValue: ColumnFilter): boolean {
    // Validate the input value using Zod
    const validatedDate = dateValueSchema.safeParse(value)
    if (!validatedDate.success) return false

    // Convert the row's date value to a dayjs object
    const rowDateValue = dayjs(validatedDate.data)

    // Convert the filter's date value to a dayjs object
    const filterDate = dayjs(filterValue.value)

    // Check if the date is valid
    if (!rowDateValue.isValid()) return false

    // Perform the appropriate date comparison
    switch (filterValue.operation) {
        case "afterDate":
            return rowDateValue.isAfter(filterDate)
        case "beforeDate":
            return rowDateValue.isBefore(filterDate)
        case "betweenDates": {
            if (!filterValue.endDate) return false
            const endDateTime = dayjs(filterValue.endDate)
            return rowDateValue.isAfter(filterDate) && rowDateValue.isBefore(endDateTime)
        }
        case "eq":
            return validatedDate.data.toString() === filterValue.value.toString()
        case "neq":
            return validatedDate.data.toString() !== filterValue.value.toString()
        case "contains":
            return validatedDate.data.toString().includes(filterValue.value.toString())
        case "notContains":
            return !validatedDate.data.toString().includes(filterValue.value.toString())
        default:
            return true
    }
}
