import type { ColumnFilter, FilterOperation } from "@/types/table/filters"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the available filter operations
const filterOperations: { label: string; value: FilterOperation }[] = [
    { label: "Greater Than", value: "gt" },
    { label: "Less Than", value: "lt" },
    { label: "Greater Than or Equal", value: "gte" },
    { label: "Less Than or Equal", value: "lte" },
    { label: "Equals", value: "eq" },
    { label: "Not Equals", value: "neq" },
    { label: "Contains", value: "contains" },
    { label: "Does Not Contain", value: "notContains" },
    { label: "After Date", value: "afterDate" },
    { label: "Before Date", value: "beforeDate" },
    { label: "Between Dates", value: "betweenDates" },
]

type FilterOperationsProps = {
    filterState: ColumnFilter
    onOperationChange: (operation: FilterOperation) => void
}

export default function FilterOperations(props: FilterOperationsProps) {
    const { filterState, onOperationChange } = props
    let columnFilterOperations: { label: string; value: FilterOperation }[] = []

    // check if filterState.value is a date
    const isDate = typeof filterState.value === "string" && !Number.isNaN(Date.parse(filterState.value))
    // check if filterState.value is a number
    const isNumber = typeof filterState.value === "number" || !Number.isNaN(Number(filterState.value))
    // check if filterState.value is a string
    const isString = typeof filterState.value === "string"

    if (isDate) {
        columnFilterOperations = [
            { label: "Contains", value: "contains" },
            { label: "Before Date", value: "beforeDate" },
            { label: "After Date", value: "afterDate" },
            { label: "Between Dates", value: "betweenDates" },
            { label: "Equals", value: "eq" },
            { label: "Not Equals", value: "neq" },
        ]
    } else if (isNumber) {
        columnFilterOperations = [
            { label: "Less Than", value: "lt" },
            { label: "Less Than or Equal", value: "lte" },
            { label: "Greater Than", value: "gt" },
            { label: "Greater Than or Equal", value: "gte" },
            { label: "Equals", value: "eq" },
            { label: "Not Equals", value: "neq" },
            { label: "Contains", value: "contains" },
            { label: "Does Not Contain", value: "notContains" },
        ]
    } else if (isString) {
        columnFilterOperations = [
            { label: "Equals", value: "eq" },
            { label: "Not Equals", value: "neq" },
            { label: "Contains", value: "contains" },
            { label: "Does Not Contain", value: "notContains" },
        ]
    } else {
        columnFilterOperations = [
            { label: "Contains", value: "contains" },
            { label: "Before Date", value: "beforeDate" },
            { label: "After Date", value: "afterDate" },
            { label: "Between Dates", value: "betweenDates" },
            { label: "Equals", value: "eq" },
            { label: "Not Equals", value: "neq" },
        ]
    }

    return (
        <RadioGroup
            className="grid grid-cols-2 gap-2"
            onValueChange={(valueChange) => onOperationChange(valueChange as FilterOperation)}
            value={filterState.operation}
        >
            {filterOperations.map((op) => (
                <div className="flex items-center space-x-2" key={op.value}>
                    <RadioGroupItem id={op.value} value={op.value} />
                    <Label htmlFor={op.value}>{op.label}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}
