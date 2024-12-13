import type { Trade } from "@/types/finance/trade"
import type { Table } from "@tanstack/react-table"
import type { Dispatch, SetStateAction } from "react"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type TableRowDeleteIconProps = {
    setData: Dispatch<SetStateAction<Trade[]>>
    table: Table<Trade>
}

export default function TableRowDeleteIcon(props: TableRowDeleteIconProps) {
    const { setData, table } = props

    // get the selected rows
    const selectedRows = table.getSelectedRowModel().rows

    // if no rows are selected, return null
    if (selectedRows.length === 0) return null

    // handle the deletion of the selected rows
    const handleDeleteSelected = () => {
        const selectedIds = selectedRows.map((row) => row.original.id)

        // Use setData to update the data
        setData((prevData) => prevData.filter((row) => !selectedIds.includes(row.id)))

        // Clear selection after delete
        table.resetRowSelection()
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
                {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected
            </span>
            <Button
                className="h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={handleDeleteSelected}
                size="icon"
                variant="ghost"
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete selected rows</span>
            </Button>
        </div>
    )
}
