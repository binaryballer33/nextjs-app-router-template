import { ChangeEvent } from "react"

import { Checkbox, Tooltip } from "@mui/material"

type CheckboxSelectAllRecords = {
    selectedAllRecords: boolean
    selectedSomeRecords: boolean
    paginatedRecords: any[]
    handleSelectAllRecords: (event: ChangeEvent<HTMLInputElement>) => void
    t: (token: string) => string
}

export default function CheckboxSelectAllRecords(props: CheckboxSelectAllRecords) {
    const { selectedAllRecords, selectedSomeRecords, paginatedRecords, handleSelectAllRecords, t } = props
    return (
        <Tooltip arrow placement="top" title={t("Select all users")}>
            <Checkbox
                edge="start"
                sx={{ mr: 1 }}
                disabled={paginatedRecords.length === 0}
                checked={selectedAllRecords}
                indeterminate={selectedSomeRecords}
                onChange={handleSelectAllRecords}
            />
        </Tooltip>
    )
}
