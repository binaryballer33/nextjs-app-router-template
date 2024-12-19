import { ArrowDown, ArrowUp } from "lucide-react"

type TableHeaderSortIndicatorProps = {
    isSorted: "asc" | "desc" | false
}

export default function TableHeaderSortIndicator(props: TableHeaderSortIndicatorProps) {
    const { isSorted } = props

    return isSorted === "asc" ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />
}
