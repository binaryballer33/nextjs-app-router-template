import { useSortable } from "@dnd-kit/sortable"
import { ArrowUpDown } from "lucide-react"

type RowDragHandleCellProps = {
    rowId: string
}

export default function RowDragHandleCell(props: RowDragHandleCellProps) {
    const { rowId } = props

    const { attributes, listeners } = useSortable({
        data: {
            // this is needed for the dnd sortable to work, it needs to know what if its a column or row
            type: "row",
        },
        id: rowId,
    })

    return <ArrowUpDown {...attributes} {...listeners} size={16} />
}
