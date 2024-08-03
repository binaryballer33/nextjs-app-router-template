import { ChangeEvent } from "react"

import { Checkbox, Tooltip } from "@mui/material"

type CheckboxSelectAllUsers = {
    selectedAllUsers: boolean
    selectedSomeUsers: boolean
    paginatedUsers: any[]
    handleSelectAllUsers: (event: ChangeEvent<HTMLInputElement>) => void
    t: (token: string) => string
}

export default function CheckboxSelectAllUsers(props: CheckboxSelectAllUsers) {
    const { selectedAllUsers, selectedSomeUsers, paginatedUsers, handleSelectAllUsers, t } = props
    return (
        <Tooltip arrow placement="top" title={t("Select all users")}>
            <Checkbox
                edge="start"
                sx={{ mr: 1 }}
                disabled={paginatedUsers.length === 0}
                checked={selectedAllUsers}
                indeterminate={selectedSomeUsers}
                onChange={handleSelectAllUsers}
            />
        </Tooltip>
    )
}
