import type { Trade } from "@/types/finance/trade"
import type { Header, Table } from "@tanstack/react-table"

type TableHeaderResizerProps = {
    header: Header<Trade, any>
    table: Table<Trade>
}

export default function TableHeaderResizer(props: TableHeaderResizerProps) {
    const { header, table } = props

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={`
                absolute right-0 top-0 h-full w-5
                cursor-col-resize touch-none select-none
                hover:bg-secondary/50 hover:opacity-100
                ${table.options.columnResizeDirection}
                ${header.column.getIsResizing() ? "bg-secondary opacity-100" : "opacity-0"}
            `}
            onDoubleClick={() => header.column.resetSize()}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
        />
    )
}
