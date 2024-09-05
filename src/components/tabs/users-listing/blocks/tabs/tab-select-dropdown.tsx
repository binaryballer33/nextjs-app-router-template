import type { ChangeEvent, Dispatch, SetStateAction } from "react"

import { MenuItem, Select } from "@mui/material"

type Tab = {
    value: string
    label: string
    count: number
}

type Filters = {
    role?: string | null
}

type TabSelectDropdownProps = {
    filters: any
    tabs: Tab[]
    setSelectedItems: Dispatch<SetStateAction<string[]>>
    setFilters: Dispatch<SetStateAction<Filters>>
    handlePageChange: (_event: any, newPage: number) => void
    t: (token: string) => string
}

export default function TabSelectDropdown(props: TabSelectDropdownProps) {
    const { filters, tabs, setSelectedItems, setFilters, handlePageChange, t } = props

    const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string

        setFilters((prevFilters) => ({
            ...prevFilters,
            role: selectedValue === "all" ? null : selectedValue,
        }))

        setSelectedItems([])
        handlePageChange(event, 0)
    }

    return (
        <Select
            value={filters.role || "all"}
            // @ts-ignore
            onChange={handleSelectChange}
            fullWidth
        >
            {tabs.map((tab) => (
                <MenuItem key={tab.value} value={tab.value}>
                    {t(tab.label)}
                </MenuItem>
            ))}
        </Select>
    )
}
