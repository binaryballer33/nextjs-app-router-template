import type { Dispatch, SetStateAction, SyntheticEvent } from "react"

import type { Theme } from "@mui/material"
import { alpha, Chip, Tab as MuiTab } from "@mui/material"

import { TabsShadow } from "src/components/base/styles/tabs"

type Tab = {
    value: string
    label: string
    count: number
}

type Filters = {
    role?: string | null
}

type CreateTabProps = {
    filters: any
    theme: Theme
    tabs: Tab[]
    setSelectedItems: Dispatch<SetStateAction<string[]>>
    setFilters: Dispatch<SetStateAction<Filters>>
    handlePageChange: (_event: any, newPage: number) => void
    t: (token: string) => string
}

export default function TabList(props: CreateTabProps) {
    const { filters, theme, tabs, setFilters, setSelectedItems, handlePageChange, t } = props

    const handleTabsChange = (_event: SyntheticEvent, tabsValue: string) => {
        let value: string | null = null

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
            sx={{
                "& .MuiTab-root": {
                    flexDirection: "row",
                    pr: 1,

                    "& .MuiChip-root": {
                        ml: 1,
                        transition: theme.transitions.create(["background", "color"], {
                            duration: theme.transitions.duration.complex,
                        }),
                    },

                    "&.Mui-selected": {
                        "& .MuiChip-root": {
                            backgroundColor: alpha(theme.palette.primary.contrastText, 0.12),
                            color: "primary.contrastText",
                        },
                    },

                    "&:first-child": {
                        ml: 0,
                    },
                },
            }}
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={filters.role || "all"}
            variant="scrollable"
        >
            {/* Create The Tabs */}
            {tabs.map((tab) => (
                <MuiTab
                    key={tab.value}
                    value={tab.value}
                    label={
                        <>
                            {t(tab.label)}
                            <Chip label={tab.count} size="small" />
                        </>
                    }
                />
            ))}
        </TabsShadow>
    )
}
