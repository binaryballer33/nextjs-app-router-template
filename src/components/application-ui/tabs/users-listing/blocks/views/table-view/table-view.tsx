import { ChangeEvent } from "react"

import { Box, Card, TablePagination } from "@mui/material"

import TableRecord from "src/components/application-ui/tabs/users-listing/blocks/views/table-view/table-record"

type TableViewProps = {
    page: number
    limit: number
    selectedItems: string[]
    paginatedUsers: any[]
    selectedAllUsers: boolean
    selectedSomeUsers: boolean
    filteredUsers: any[]
    handlePageChange: (event: unknown, newPage: number) => void
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectOneUser: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    handleSelectAllUsers: (event: ChangeEvent<HTMLInputElement>) => void
    t: (token: string) => string
}

function TableView(props: TableViewProps) {
    const {
        page,
        limit,
        selectedItems,
        paginatedUsers,
        filteredUsers,
        selectedAllUsers,
        selectedSomeUsers,
        handlePageChange,
        handleLimitChange,
        handleSelectOneUser,
        handleSelectAllUsers,
        t,
    } = props

    return (
        <>
            {/* Card Wraps Around The Table To Give It A Background */}
            <Card>
                <TableRecord
                    paginatedUsers={paginatedUsers}
                    selectedItems={selectedItems}
                    selectedAllUsers={selectedAllUsers}
                    selectedSomeUsers={selectedSomeUsers}
                    handleSelectOneUser={handleSelectOneUser}
                    handleSelectAllUsers={handleSelectAllUsers}
                    t={t}
                />
            </Card>

            {/* Pagination Container */}
            <Box
                pt={2}
                sx={{
                    ".MuiTablePagination-select": {
                        py: 0.55,
                    },
                }}
            >
                {/* Create The Pagination Buttons And Information */}
                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 15]}
                    slotProps={{
                        select: {
                            variant: "outlined",
                            size: "small",
                            sx: {
                                p: 0,
                            },
                        },
                    }}
                />
            </Box>
        </>
    )
}

export default TableView
