import type { ChangeEvent } from "react"

import { Checkbox, Tooltip } from "@mui/material"

type CheckboxSelectAllRecordsProps = {
    handleSelectAllRecords: (event: ChangeEvent<HTMLInputElement>) => void
    paginatedRecords: any[]
    selectedAllRecords: boolean
    selectedSomeRecords: boolean
    t: (token: string) => string
}

export default function CheckboxSelectAllRecords(props: CheckboxSelectAllRecordsProps) {
    const { handleSelectAllRecords, paginatedRecords, selectedAllRecords, selectedSomeRecords, t } = props
    return (
        <Tooltip arrow placement="top" title={t("Select all users")}>
            <Checkbox
                checked={selectedAllRecords}
                disabled={paginatedRecords.length === 0}
                edge="start"
                indeterminate={selectedSomeRecords}
                onChange={handleSelectAllRecords}
                sx={{ mr: 1 }}
            />
        </Tooltip>
    )
}
