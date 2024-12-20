import type { Trade } from "@/types/finance/trade"
import type { ColumnFilter, FilterOperation } from "@/types/table/filters"
import type { Header } from "@tanstack/react-table"

import { useEffect, useState } from "react"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type TableHeaderColumnFilterProps = {
    header: Header<Trade, unknown>
}

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

export default function TableHeaderColumnFilter(props: TableHeaderColumnFilterProps) {
    const { header } = props
    const [open, setOpen] = useState(false)
    const [operation, setOperation] = useState<FilterOperation>("contains")
    const [value, setValue] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        const currentFilter = header.column.getFilterValue() as ColumnFilter
        if (currentFilter) {
            setOperation(currentFilter.operation)
            setValue(String(currentFilter.value))
        }
    }, [header.column])

    const handleFilter = () => {
        if (!value.trim()) {
            header.column.setFilterValue(null)
            return
        }

        const filterValue: ColumnFilter = {
            operation,
            value:
                operation === "contains" || operation === "notContains"
                    ? value
                    : operation === "afterDate" || operation === "beforeDate" || operation === "betweenDates"
                      ? value
                      : Number(value),
        }

        if (operation === "betweenDates" && endDate) {
            filterValue.endDate = endDate
        }

        header.column.setFilterValue(filterValue)
    }

    const clearFilter = () => {
        setValue("")
        setEndDate("")
        header.column.setFilterValue(null)
        setOpen(false)
    }

    const isDateOperation = operation === "afterDate" || operation === "beforeDate" || operation === "betweenDates"

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button className={header.column.getIsFiltered() ? "text-primary" : ""} size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Filter {header.column.id}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filter {header.column.id}</h4>

                    <div className="space-y-2">
                        <Label>Operation</Label>
                        <RadioGroup
                            className="grid grid-cols-2 gap-2"
                            onValueChange={(valueChange) => setOperation(valueChange as FilterOperation)}
                            value={operation}
                        >
                            {filterOperations.map((op) => (
                                <div className="flex items-center space-x-2" key={op.value}>
                                    <RadioGroupItem id={op.value} value={op.value} />
                                    <Label htmlFor={op.value}>{op.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>{isDateOperation ? "Start Date" : "Value"}</Label>
                        <Input
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={isDateOperation ? "Select date..." : "Filter value..."}
                            type={
                                isDateOperation
                                    ? "date"
                                    : operation === "contains" || operation === "notContains"
                                      ? "text"
                                      : "number"
                            }
                            value={value}
                        />
                    </div>

                    {operation === "betweenDates" && (
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="Select end date..."
                                type="date"
                                value={endDate}
                            />
                        </div>
                    )}

                    <div className="flex justify-between">
                        <Button onClick={clearFilter} variant="outline">
                            Clear
                        </Button>
                        <Button onClick={handleFilter}>Apply Filter</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
