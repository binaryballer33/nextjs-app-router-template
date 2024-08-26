"use client"

import { ChangeEvent, useState } from "react"

import { Box, Stack, Tab, useMediaQuery, useTheme } from "@mui/material"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import CheckboxSelectAllRecords from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/checkbox-select-all-records"
import NoDataResults from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import PaginationQuerySearchBox from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/pagination-query-search-box"
import ShareIcon from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/share-icon"
import TabList from "src/components/application-ui/tabs/users-listing/blocks/tabs/tab-list"
import TabSelectDropdown from "src/components/application-ui/tabs/users-listing/blocks/tabs/tab-select-dropdown"
import NoView from "src/components/application-ui/tabs/users-listing/blocks/views/no-view"
import TableView from "src/components/application-ui/tabs/users-listing/blocks/views/table-view/table-view"
import ToggleViewIcons from "src/components/application-ui/tabs/users-listing/blocks/views/toggle-view-icons"
import usePagination from "src/hooks/usePagination"

import BulkDeleteIconDialog from "./blocks/dialogs/bulk-delete-icon-dialog"
import GridView from "./blocks/views/grid-view/grid-view"

type CardTabProps = {
    cards: any[]
}

type Filters = {
    role?: string | null
}

type Tab = {
    value: string
    label: string
    count: number
}

export default function CardTabs({ cards }: CardTabProps) {
    const [toggleView, setToggleView] = useState<string | null>("grid_view")
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [query, setQuery] = useState<string>("")
    const [filters, setFilters] = useState<Filters>({
        role: null,
    })

    const { page, limit, handlePageChange, handleLimitChange, paginate } = usePagination(0, 5)
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
            value: "all",
            label: t("All cards"),
            count: cards.length,
        },
        {
            value: "customer",
            label: t("Customers"),
            count: cards.length,
        },
        {
            value: "admin",
            label: t("Administrators"),
            count: cards.length,
        },
        {
            value: "subscriber",
            label: t("Subscribers"),
            count: cards.length,
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
                    theme={theme}
                    tabs={tabs}
                    setSelectedItems={setSelectedItems}
                    setFilters={setFilters}
                    handlePageChange={handlePageChange}
                    t={t}
                />
            ) : (
                // If the screen is small, show a select dropdown list for the tabs
                <TabSelectDropdown
                    filters={filters}
                    tabs={tabs}
                    setSelectedItems={setSelectedItems}
                    handlePageChange={handlePageChange}
                    setFilters={setFilters}
                    t={t}
                />
            )}

            {/* Create The Select All Check Box, The Search Box  And The Toggle View Icons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                {/* Create The Select All Check Box, The Search Box */}
                <Box display="flex" alignItems="center">
                    {/* If  grid_view is the current view than display the checkbox */}
                    {toggleView === "grid_view" && (
                        <CheckboxSelectAllRecords
                            selectedAllRecords={selectedAllItems}
                            selectedSomeRecords={selectedSomeItems}
                            paginatedRecords={cards}
                            handleSelectAllRecords={handleSelectAllItems}
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
                <ToggleViewIcons toggleView={toggleView} setToggleView={setToggleView} />
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
                            page={page}
                            limit={limit}
                            selectedRecords={selectedItems}
                            paginatedRecords={paginatedItems}
                            selectedAllRecords={selectedAllItems}
                            selectedSomeRecords={selectedSomeItems}
                            filteredRecords={filteredItems}
                            handlePageChange={handlePageChange}
                            handleLimitChange={handleLimitChange}
                            handleSelectOneRecord={handleSelectOneItems}
                            handleSelectAllRecords={handleSelectAllItems}
                            t={t}
                        />
                    )}

                    {/* Display The Grid If Toggle View Is Grid View */}
                    {toggleView === "grid_view" && (
                        <GridView
                            page={page}
                            limit={limit}
                            selectedRecords={selectedItems}
                            paginatedRecords={paginatedItems}
                            filteredRecords={filteredItems}
                            handlePageChange={handlePageChange}
                            handleLimitChange={handleLimitChange}
                            handleSelectOneRecord={handleSelectOneItems}
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

CardTabs.propTypes = {
    cards: PropTypes.array.isRequired,
}
