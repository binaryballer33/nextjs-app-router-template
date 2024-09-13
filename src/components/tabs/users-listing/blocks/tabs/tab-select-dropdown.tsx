import type { ChangeEvent, Dispatch, SetStateAction } from "react"

import { MenuItem, Select } from "@mui/material"

type Tab = {
    count: number
    label: string
    value: string
}

type Filters = {
    role?: null | string
}

type TabSelectDropdownProps = {
    filters: any
    handlePageChange: (_event: any, newPage: number) => void
    setFilters: Dispatch<SetStateAction<Filters>>
    setSelectedItems: Dispatch<SetStateAction<string[]>>
    t: (token: string) => string
    tabs: Tab[]
}

export default function TabSelectDropdown(props: TabSelectDropdownProps) {
    const { filters, handlePageChange, setFilters, setSelectedItems, t, tabs } = props

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
            fullWidth
            // @ts-ignore
            onChange={handleSelectChange}
            value={filters.role || "all"}
        >
            {tabs.map((tab) => (
                <MenuItem key={tab.value} value={tab.value}>
                    {t(tab.label)}
                </MenuItem>
            ))}
        </Select>
    )
}
