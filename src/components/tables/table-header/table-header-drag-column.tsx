import type { DraggableAttributes } from "@dnd-kit/core"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"

import { ArrowRightLeft } from "lucide-react"

type TableHeaderDragColumnProps = {
    attributes: DraggableAttributes
    listeners: SyntheticListenerMap | undefined
}

export default function TableHeaderDragColumn(props: TableHeaderDragColumnProps) {
    const { attributes, listeners } = props

    return <ArrowRightLeft className="h-5 w-5" {...attributes} {...listeners} />
}
