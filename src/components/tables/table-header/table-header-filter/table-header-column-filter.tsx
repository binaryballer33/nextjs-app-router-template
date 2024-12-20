import type { Trade } from "@/types/finance/trade"
import type { ColumnFilter, FilterOperation } from "@/types/table/filters"
import type { Header } from "@tanstack/react-table"

import { useCallback, useEffect, useState } from "react"

import { Search } from "lucide-react"

import { useBoolean } from "@/hooks/use-boolean"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import FilterInputs from "./table-header-filter-inputs"
import FilterOperations from "./table-heeader-filter-operations"

// Define the props for the TableHeaderColumnFilter component
type TableHeaderColumnFilterProps = {
    header: Header<Trade, unknown>
}

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

// TODO: if a column has a filter, the column header should have a filter icon or something to indicate that the column is in a filtered state
// TODO: add a "clear all filters" button
// TODO: figure out a way to still be able to see the column that you are trying to filter when the filter menu opens
// TODO: when pressing enter the filter menu should apply the filter and close
// TODO: put a clear filter option in the filter menu and maybe in the information dropdown menu for setting 3
// TODO:if you are in the filter menu for the date column you should only have options related to dates, before, after, bettween, this rule needs to apply to all columns, they should only have options related to the column type
// TODO: when selecting a date range after selecting the start date the end date should be focused
// TODO: create a DebouncedInput component that debounces the input and only updates the state after a delay
export default function TableHeaderColumnFilter(props: TableHeaderColumnFilterProps) {
    const { header } = props

    const [filterState, setFilterState] = useState({
        endDate: "",
        operation: "contains" as FilterOperation,
        value: "",
    })

    const { handleFalse: closeOpen, handleToggle: toggleOpen, value: open } = useBoolean(false)

    const handleFilter = useCallback(() => {
        const { endDate, operation, value } = filterState

        // if the value is empty, clear the filter
        if (!value.trim()) {
            header.column.setFilterValue(null)
            return
        }

        // Create the filter value object
        const filterValue: ColumnFilter = {
            operation,
            value: convertRowValueToAppropriateType(operation, value),
        }

        // Add endDate if the operation is "betweenDates"
        if (operation === "betweenDates" && endDate) filterValue.endDate = endDate

        // filter the column based on the filter value
        header.column.setFilterValue(filterValue)
    }, [filterState, header.column])

    // Apply the filter whenever the filterState changes
    useEffect(() => {
        handleFilter()
    }, [filterState, handleFilter])

    // apply the filter and close the popover menu
    const handleApplyFilter = useCallback(() => {
        handleFilter()
        closeOpen()
    }, [handleFilter, closeOpen])

    // Clear the filter and reset the state
    const clearFilter = () => {
        setFilterState({ endDate: "", operation: "contains", value: "" })
        header.column.setFilterValue(null)
        closeOpen()
    }

    // Determine if the current operation is a date operation
    const isDateOperation = ["afterDate", "beforeDate", "betweenDates"].includes(filterState.operation)

    // if its a string operation, return the string value, otherwise return the number value
    const convertRowValueToAppropriateType = (filterOperation: FilterOperation, rowValue: string) => {
        if (["afterDate", "beforeDate", "betweenDates", "contains", "notContains"].includes(filterOperation)) {
            return rowValue
        }
        return Number(rowValue)
    }

    // close the popover menu when the user presses enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") closeOpen()
    }

    return (
        <Popover onOpenChange={toggleOpen} open={open}>
            <PopoverTrigger asChild>
                <Button className={header.column.getIsFiltered() ? "text-primary" : ""} size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Filter {header.column.id}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filter Based On {header.column.id}</h4>
                    <FilterOperations
                        onOperationChange={(operation) => setFilterState((prev) => ({ ...prev, operation }))}
                        operations={filterOperations}
                        selectedOperation={filterState.operation}
                    />
                    <FilterInputs
                        filterState={filterState}
                        isDateOperation={isDateOperation}
                        onEndDateChange={(endDate) => setFilterState((prev) => ({ ...prev, endDate }))}
                        onKeyDown={handleKeyDown}
                        onValueChange={(value) => setFilterState((prev) => ({ ...prev, value }))}
                        open={open}
                    />
                    <div className="flex justify-between">
                        <Button onClick={clearFilter}>Clear</Button>
                        <Button onClick={handleApplyFilter}>Apply Filter</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
