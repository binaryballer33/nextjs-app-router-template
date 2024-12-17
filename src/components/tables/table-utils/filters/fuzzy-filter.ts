import type { Trade } from "@/types/finance/trade"
import type { FilterFn } from "@tanstack/react-table"

import { rankItem } from "@tanstack/match-sorter-utils"

const fuzzyFilter: FilterFn<Trade> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({ itemRank })

    return itemRank.passed
}

export default fuzzyFilter