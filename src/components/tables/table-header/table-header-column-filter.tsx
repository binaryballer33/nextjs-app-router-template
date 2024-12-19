import type { Trade } from "@/types/finance/trade"
import type { Header } from "@tanstack/react-table"

import { Search } from "lucide-react"

type TableHeaderColumnFilterProps = {
    header: Header<Trade, unknown>
}

export default function TableHeaderColumnFilter(props: TableHeaderColumnFilterProps) {
    const { header } = props

    return <Search className="h-5 w-5" />
}
