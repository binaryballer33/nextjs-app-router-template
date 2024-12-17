import { ArrowDown, ArrowUp } from "lucide-react"

type TableHeaderSortIndicatorProps = {
    isSorted: "asc" | "desc" | false
}

export default function TableHeaderSortIndicator(props: TableHeaderSortIndicatorProps) {
    const { isSorted } = props

    return isSorted && (isSorted === "asc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />)
}
