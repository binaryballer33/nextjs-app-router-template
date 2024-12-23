"use client"

import type { ColumnFilter } from "@/types/table/filters"

import { useEffect, useRef } from "react"

import { Label } from "@/components/ui/label"

import DebouncedInput from "../../table-utils/debounced-input"

type FilterInputsProps = {
    closeOpen: () => void
    filterState: ColumnFilter
    onEndDateChange: (endDate: string) => void
    onValueChange: (value: string) => void
    open: boolean
}

export default function FilterInputs(props: FilterInputsProps) {
    const { closeOpen, filterState, onEndDateChange, onValueChange, open } = props
    const inputRef = useRef<HTMLInputElement>(null)

    // Determine if the current operation is a date operation
    const isDateOperation = ["afterDate", "beforeDate", "betweenDates"].includes(filterState.operation)

    // Focus the input when the popover opens
    useEffect(() => {
        if (open) {
            // Small timeout to ensure DOM is ready
            const timeoutId = setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
            return () => clearTimeout(timeoutId)
        }
        return () => clearTimeout(100)
    }, [open])

    // close the popover menu when the user presses enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") closeOpen()
    }

    return (
        <div className="flex">
            <div className="w-full text-center">
                <Label htmlFor="filter-input">{isDateOperation ? "Date" : "Search Data"}</Label>
                <DebouncedInput
                    className="w-full"
                    id="filter-input"
                    onChange={onValueChange}
                    onKeyDown={handleKeyDown}
                    placeholder={isDateOperation ? "Select Date..." : "Search Data..."}
                    ref={inputRef}
                    type={isDateOperation ? "date" : "text"}
                    value={filterState.value.toString()}
                />
            </div>

            {filterState.operation === "betweenDates" && (
                <div className="w-full text-center">
                    <Label htmlFor="end-date-input">End Date</Label>
                    <DebouncedInput
                        className="w-full"
                        id="end-date-input"
                        onChange={onEndDateChange}
                        placeholder="Select End Date..."
                        type="date"
                        value={filterState.endDate?.toString() ?? ""}
                    />
                </div>
            )}
        </div>
    )
}
