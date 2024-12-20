import type { FilterOperation } from "@/types/table/filters"

import { useEffect, useRef } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FilterInputsProps = {
    closeOpen: () => void
    filterState: { endDate: string; operation: FilterOperation; value: string }
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
                <Label>{isDateOperation ? "Date" : "Search Data"}</Label>
                <Input
                    className="w-full"
                    onChange={(e) => onValueChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isDateOperation ? "Select Date..." : "Search Data..."}
                    ref={inputRef}
                    type={isDateOperation ? "date" : "text"}
                    value={filterState.value}
                />
            </div>

            {filterState.operation === "betweenDates" && (
                <div className="w-full text-center">
                    <Label>End Date</Label>
                    <Input
                        className="w-full"
                        onChange={(e) => onEndDateChange(e.target.value)}
                        placeholder="Select End Date..."
                        type="date"
                        value={filterState.endDate}
                    />
                </div>
            )}
        </div>
    )
}
