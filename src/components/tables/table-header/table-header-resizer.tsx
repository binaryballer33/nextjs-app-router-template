import type { Trade } from "@/types/finance/trade"
import type { Header } from "@tanstack/react-table"

import { ArrowRightToLine } from "lucide-react"

type TableHeaderResizerProps = {
    header: Header<Trade, any>
}

export default function TableHeaderResizer(props: TableHeaderResizerProps) {
    const { header } = props

    return (
        header.column.getCanResize() && (
            <ArrowRightToLine
                className={`
                        absolute right-0 top-0 h-full w-3
                        cursor-col-resize touch-none select-none
                        bg-secondary/50 opacity-100 max-sm:w-1.5
                    `}
                onDoubleClick={() => header.column.resetSize()}
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
            />
        )
    )
}
