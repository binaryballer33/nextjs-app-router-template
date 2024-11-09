"use client"

import type { ChangeEvent } from "react"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import { Box, Stack, useMediaQuery, useTheme } from "@mui/material"

import usePagination from "src/hooks/usePagination"

import CheckboxSelectAllRecords from "src/components/tabs/users-listing/blocks/buttons-icons-input-text/checkbox-select-all-records"
import NoDataResults from "src/components/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import PaginationQuerySearchBox from "src/components/tabs/users-listing/blocks/buttons-icons-input-text/pagination-query-search-box"
import ShareIcon from "src/components/tabs/users-listing/blocks/buttons-icons-input-text/share-icon"
import TabList from "src/components/tabs/users-listing/blocks/tabs/tab-list"
import TabSelectDropdown from "src/components/tabs/users-listing/blocks/tabs/tab-select-dropdown"
import NoView from "src/components/tabs/users-listing/blocks/views/no-view"
import TableView from "src/components/tabs/users-listing/blocks/views/table-view/table-view"
import ToggleViewIcons from "src/components/tabs/users-listing/blocks/views/toggle-view-icons"

import BulkDeleteIconDialog from "./blocks/dialogs/bulk-delete-icon-dialog"
import GridView from "./blocks/views/grid-view/grid-view"

type CardTabProps = {
    cards: any[]
}

type Filters = {
    role?: null | string
}

type Tab = {
    count: number
    label: string
    value: string
}

export default function CardTabs({ cards }: CardTabProps) {
    const [toggleView, setToggleView] = useState<null | string>("grid_view")
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [query, setQuery] = useState<string>("")
    const [filters, setFilters] = useState<Filters>({
        role: null,
    })

    const { handleLimitChange, handlePageChange, limit, page, paginate } = usePagination(0, 5)
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const { t } = useTranslation()

    const filteredItems = cards // TODO: filter later
    const paginatedItems = paginate(filteredItems, page, limit)
    const selectedBulkActions = selectedItems.length > 0
    const selectedSomeItems = selectedItems.length > 0 && selectedItems.length < cards.length
    const selectedAllItems = selectedItems.length === cards.length

    const tabs: Tab[] = [
        {
            count: cards.length,
            label: t("All cards"),
            value: "all",
        },
        {
            count: cards.length,
            label: t("Customers"),
            value: "customer",
        },
        {
            count: cards.length,
            label: t("Administrators"),
            value: "admin",
        },
        {
            count: cards.length,
            label: t("Subscribers"),
            value: "subscriber",
        },
    ]

    const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedItems(event.target.checked ? cards.map((card) => card.id.toString()) : [])
    }

    const handleSelectOneItems = (_event: ChangeEvent<HTMLInputElement>, itemId: string): void => {
        if (!selectedItems.includes(itemId)) setSelectedItems((prevSelected) => [...prevSelected, itemId])
        else setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId))
    }

    return (
        <>
            {/* Create All The Tabs */}
            {smUp ? (
                <TabList
                    filters={filters}
                    handlePageChange={handlePageChange}
                    setFilters={setFilters}
                    setSelectedItems={setSelectedItems}
                    t={t}
                    tabs={tabs}
                    theme={theme}
                />
            ) : (
                // If the screen is small, show a select dropdown list for the tabs
                <TabSelectDropdown
                    filters={filters}
                    handlePageChange={handlePageChange}
                    setFilters={setFilters}
                    setSelectedItems={setSelectedItems}
                    t={t}
                    tabs={tabs}
                />
            )}

            {/* Create The Select All Check Box, The Search Box  And The Toggle View Icons */}
            <Box alignItems="center" display="flex" justifyContent="space-between" py={2}>
                {/* Create The Select All Check Box, The Search Box */}
                <Box alignItems="center" display="flex">
                    {/* If  grid_view is the current view than display the checkbox */}
                    {toggleView === "grid_view" && (
                        <CheckboxSelectAllRecords
                            handleSelectAllRecords={handleSelectAllItems}
                            paginatedRecords={cards}
                            selectedAllRecords={selectedAllItems}
                            selectedSomeRecords={selectedSomeItems}
                            t={t}
                        />
                    )}

                    {/* If You Checked Items, Display Delete Icon */}
                    {selectedBulkActions ? (
                        <Stack direction="row" spacing={1}>
                            {/* Opens A Dialog To Confirm Deletion */}
                            <BulkDeleteIconDialog />

                            {/* Share Icon */}
                            <ShareIcon t={t} />
                        </Stack>
                    ) : (
                        //  If Nothing Is Checked, Show The Search Input Text Box For The Queries
                        <PaginationQuerySearchBox query={query} setQuery={setQuery} t={t} />
                    )}
                </Box>

                {/* Create The Toggle Table View And Grid View Icons */}
                <ToggleViewIcons setToggleView={setToggleView} toggleView={toggleView} />
            </Box>

            {/* If No Data Display Message Stating That */}
            {paginatedItems.length === 0 ? (
                <NoDataResults t={t} />
            ) : (
                //  If There Is Data, Display It
                <>
                    {/* Display The Table If Toggle View Is Table View */}
                    {toggleView === "table_view" && (
                        <TableView
                            filteredRecords={filteredItems}
                            handleLimitChange={handleLimitChange}
                            handlePageChange={handlePageChange}
                            handleSelectAllRecords={handleSelectAllItems}
                            handleSelectOneRecord={handleSelectOneItems}
                            limit={limit}
                            page={page}
                            paginatedRecords={paginatedItems}
                            selectedAllRecords={selectedAllItems}
                            selectedRecords={selectedItems}
                            selectedSomeRecords={selectedSomeItems}
                            t={t}
                        />
                    )}

                    {/* Display The Grid If Toggle View Is Grid View */}
                    {toggleView === "grid_view" && (
                        <GridView
                            filteredRecords={filteredItems}
                            handleLimitChange={handleLimitChange}
                            handlePageChange={handlePageChange}
                            handleSelectOneRecord={handleSelectOneItems}
                            limit={limit}
                            page={page}
                            paginatedRecords={paginatedItems}
                            selectedRecords={selectedItems}
                            t={t}
                        />
                    )}

                    {/* If No View Is Selected Display Text Stating To Choose A View */}
                    {!toggleView && <NoView t={t} />}
                </>
            )}
        </>
    )
}
