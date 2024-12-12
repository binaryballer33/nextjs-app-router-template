"use client"

import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"

import { Dice4 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { convertCamelToTitleCase } from "./table-utils"

type ColumnVisibilitySelectorProps = {
    columnIds: string[]
    table: Table<Trade>
}

export default function ColumnVisibilitySelector(props: ColumnVisibilitySelectorProps) {
    const { columnIds, table } = props

    const columnVisibilityState = Object.entries(table.getState().columnVisibility)
        .filter(([_, value]) => value)
        .map(([key]) => key)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="m-2" size="icon" variant="ghost">
                    <Dice4 className="h-4 w-4" />
                    <span className="sr-only">Show Column Visibility</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4">
                <div className="space-y-4">
                    <RadioGroup
                        className="flex gap-4"
                        defaultValue="all"
                        onValueChange={(value) => {
                            table.setColumnVisibility(
                                columnIds.reduce((acc: { [id: string]: boolean }, val) => {
                                    acc[val] = value === "all"
                                    return acc
                                }, {}),
                            )
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="all" value="all" />
                            <Label htmlFor="all">Show All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="none" value="none" />
                            <Label htmlFor="none">Show None</Label>
                        </div>
                    </RadioGroup>

                    <div className="space-y-2">
                        {columnIds.map((id) => (
                            <div className="flex items-center space-x-2" key={id}>
                                <Checkbox
                                    checked={columnVisibilityState.includes(id)}
                                    id={id}
                                    onCheckedChange={(checked) => {
                                        const newState = checked
                                            ? [...columnVisibilityState, id]
                                            : columnVisibilityState.filter((item) => item !== id)

                                        table.setColumnVisibility(
                                            columnIds.reduce((acc: { [id: string]: boolean }, val) => {
                                                acc[val] = newState.includes(val)
                                                return acc
                                            }, {}),
                                        )
                                    }}
                                />
                                <Label htmlFor={id}>{convertCamelToTitleCase(id)}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
