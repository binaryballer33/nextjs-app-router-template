import { ChangeEvent, useState } from "react"

import { Box, Stack, Tab, useMediaQuery, useTheme } from "@mui/material"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import CheckboxSelectAllUsers from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/checkbox-select-all-users"
import NoDataResults from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import PaginationQuerySearchBox from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/pagination-query-search-box"
import ShareIcon from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/share-icon"
import TabList from "src/components/application-ui/tabs/users-listing/blocks/tabs/tab-list"
import TabSelectDropdown from "src/components/application-ui/tabs/users-listing/blocks/tabs/tab-select-dropdown"
import GridView from "src/components/application-ui/tabs/users-listing/blocks/views/grid-view"
import NoView from "src/components/application-ui/tabs/users-listing/blocks/views/no-view"
import TableView from "src/components/application-ui/tabs/users-listing/blocks/views/table-view"
import ToggleViewIcons from "src/components/application-ui/tabs/users-listing/blocks/views/toggle-view-icons"
import usePagination from "src/hooks/usePagination"
import { User } from "src/mocks/user-mocks"

import BulkDeleteIconDialog from "./blocks/dialogs/bulk-delete-icon-dialog"

type UserTabsProps = {
    users: User[]
}

type Filters = {
    role?: string | null
}

type Tab = {
    value: string
    label: string
    count: number
}

type TabCounts = {
    all: number
    customer: number
    admin: number
    subscriber: number
}

const filterData = (users: User[], query: string, filters: Filters): User[] => {
    return users.filter((user) => {
        let matches = true

        if (query) {
            const properties = ["email", "name", "username"]
            let containsQuery = false

            // if the user's email, name or username is inside the search box query set containsQuery to true
            properties.forEach((property) => {
                if (user[property].toLowerCase().includes(query.toLowerCase())) containsQuery = true
            })

            if (filters.role && user.role !== filters.role) matches = false

            if (!containsQuery) matches = false
        }

        Object.keys(filters).forEach((key) => {
            // @ts-ignore
            const value = filters[key]

            if (value && user[key] !== value) matches = false
        })

        return matches
    })
}

export default function UserTabs({ users }: UserTabsProps) {
    const [toggleView, setToggleView] = useState<string | null>("grid_view")
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [query, setQuery] = useState<string>("")
    const [filters, setFilters] = useState<Filters>({
        role: null,
    })

    const { page, limit, handlePageChange, handleLimitChange, paginate } = usePagination()
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const { t } = useTranslation()

    const filteredUsers = filterData(users, query, filters)
    const paginatedUsers = paginate(filteredUsers, page, limit)
    const selectedBulkActions = selectedItems.length > 0
    const selectedSomeUsers = selectedItems.length > 0 && selectedItems.length < users.length
    const selectedAllUsers = selectedItems.length === users.length

    const userCounts: TabCounts = {
        all: users.length,
        customer: users.filter((user) => user.role === "customer").length,
        admin: users.filter((user) => user.role === "admin").length,
        subscriber: users.filter((user) => user.role === "subscriber").length,
    }

    const tabs: Tab[] = [
        {
            value: "all",
            label: t("All users"),
            count: userCounts.all,
        },
        {
            value: "customer",
            label: t("Customers"),
            count: userCounts.customer,
        },
        {
            value: "admin",
            label: t("Administrators"),
            count: userCounts.admin,
        },
        {
            value: "subscriber",
            label: t("Subscribers"),
            count: userCounts.subscriber,
        },
    ]

    const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedItems(event.target.checked ? users.map((user) => user.id) : [])
    }

    const handleSelectOneUser = (_event: ChangeEvent<HTMLInputElement>, userId: string): void => {
        if (!selectedItems.includes(userId)) setSelectedItems((prevSelected) => [...prevSelected, userId])
        else setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== userId))
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
                        <CheckboxSelectAllUsers
                            selectedAllUsers={selectedAllUsers}
                            selectedSomeUsers={selectedSomeUsers}
                            paginatedUsers={paginatedUsers}
                            handleSelectAllUsers={handleSelectAllUsers}
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
            {paginatedUsers.length === 0 ? (
                <NoDataResults t={t} />
            ) : (
                //  If There Is Data, Display It
                <>
                    {/* Display The Table If Toggle View Is Table View */}
                    {toggleView === "table_view" && (
                        <TableView
                            page={page}
                            limit={limit}
                            selectedItems={selectedItems}
                            paginatedUsers={paginatedUsers}
                            selectedAllUsers={selectedAllUsers}
                            selectedSomeUsers={selectedSomeUsers}
                            filteredUsers={filteredUsers}
                            handlePageChange={handlePageChange}
                            handleLimitChange={handleLimitChange}
                            handleSelectOneUser={handleSelectOneUser}
                            handleSelectAllUsers={handleSelectAllUsers}
                            t={t}
                        />
                    )}

                    {/* Display The Grid If Toggle View Is Grid View */}
                    {toggleView === "grid_view" && (
                        <GridView
                            page={page}
                            limit={limit}
                            selectedItems={selectedItems}
                            paginatedUsers={paginatedUsers}
                            filteredUsers={filteredUsers}
                            handlePageChange={handlePageChange}
                            handleLimitChange={handleLimitChange}
                            handleSelectOneUser={handleSelectOneUser}
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

UserTabs.propTypes = {
    users: PropTypes.array.isRequired,
}
