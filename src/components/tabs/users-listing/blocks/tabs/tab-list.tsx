import type { Theme } from "@mui/material"
import type { Dispatch, SetStateAction, SyntheticEvent } from "react"

import { alpha, Chip, Tab as MuiTab } from "@mui/material"

import { TabsShadow } from "src/components/base/styles/tabs"

type Tab = {
    count: number
    label: string
    value: string
}

type Filters = {
    role?: null | string
}

type CreateTabProps = {
    filters: any
    handlePageChange: (_event: any, newPage: number) => void
    setFilters: Dispatch<SetStateAction<Filters>>
    setSelectedItems: Dispatch<SetStateAction<string[]>>
    t: (token: string) => string
    tabs: Tab[]
    theme: Theme
}

export default function TabList(props: CreateTabProps) {
    const { filters, handlePageChange, setFilters, setSelectedItems, t, tabs, theme } = props

    const handleTabsChange = (_event: SyntheticEvent, tabsValue: string) => {
        let value: null | string = null

        if (tabsValue !== "all") value = tabsValue as string

        setFilters((prevFilters) => ({
            ...prevFilters,
            role: value,
        }))

        setSelectedItems([])
        handlePageChange(_event, 0)
    }

    return (
        <TabsShadow
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{
                "& .MuiTab-root": {
                    "& .MuiChip-root": {
                        ml: 1,
                        transition: theme.transitions.create(["background", "color"], {
                            duration: theme.transitions.duration.complex,
                        }),
                    },
                    "&:first-child": {
                        ml: 0,
                    },

                    "&.Mui-selected": {
                        "& .MuiChip-root": {
                            backgroundColor: alpha(theme.palette.primary.contrastText, 0.12),
                            color: "primary.contrastText",
                        },
                    },

                    flexDirection: "row",

                    pr: 1,
                },
            }}
            textColor="secondary"
            value={filters.role || "all"}
            variant="scrollable"
        >
            {/* Create The Tabs */}
            {tabs.map((tab) => (
                <MuiTab
                    key={tab.value}
                    label={
                        <>
                            {t(tab.label)}
                            <Chip label={tab.count} size="small" />
                        </>
                    }
                    value={tab.value}
                />
            ))}
        </TabsShadow>
    )
}
