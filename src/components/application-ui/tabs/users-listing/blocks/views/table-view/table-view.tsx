import { ChangeEvent } from "react"

import { Box, Card, Table, TableBody, TableContainer, TablePagination } from "@mui/material"

import TableColumns from "src/components/application-ui/tabs/users-listing/blocks/views/table-view/table-columns"
import TableRecord from "src/components/application-ui/tabs/users-listing/blocks/views/table-view/table-record"
import { YuGiOhCard } from "src/models/cards/yu-gi-oh"

type TableViewProps = {
    page: number
    limit: number
    selectedRecords: string[]
    paginatedRecords: YuGiOhCard[]
    selectedAllRecords: boolean
    selectedSomeRecords: boolean
    filteredRecords: any[]
    handlePageChange: (event: unknown, newPage: number) => void
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectOneRecord: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    handleSelectAllRecords: (event: ChangeEvent<HTMLInputElement>) => void
    t: (token: string) => string
}

export default function TableView(props: TableViewProps) {
    const {
        page,
        limit,
        selectedRecords,
        paginatedRecords,
        filteredRecords,
        selectedAllRecords,
        selectedSomeRecords,
        handlePageChange,
        handleLimitChange,
        handleSelectOneRecord,
        handleSelectAllRecords,
        t,
    } = props

    return (
        <>
            {/* Card Wraps Around The Table To Give It A Background */}
            <Card>
                <TableContainer>
                    <Table>
                        {/* Table Column Headers */}
                        <TableColumns
                            selectedAllRecords={selectedAllRecords}
                            selectedSomeRecords={selectedSomeRecords}
                            handleSelectAllRecords={handleSelectAllRecords}
                            t={t}
                        />

                        <TableBody>
                            {/* Create The Table Rows From The Paginated Data */}
                            {paginatedRecords.map((item) => (
                                <TableRecord
                                    key={item.name}
                                    record={item}
                                    selectedRecords={selectedRecords}
                                    handleSelectOneRecord={handleSelectOneRecord}
                                    t={t}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                    count={filteredRecords.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
