import type { ChangeEvent } from "react"
import type { YuGiOhCard } from "src/types/yu-gi-oh/yu-gi-oh"

import { Box, Card, Table, TableBody, TableContainer, TablePagination } from "@mui/material"

import TableColumns from "src/components/tabs/users-listing/blocks/views/table-view/table-columns"
import TableRecord from "src/components/tabs/users-listing/blocks/views/table-view/table-record"

type TableViewProps = {
    filteredRecords: any[]
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handlePageChange: (event: unknown, newPage: number) => void
    handleSelectAllRecords: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectOneRecord: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    limit: number
    page: number
    paginatedRecords: YuGiOhCard[]
    selectedAllRecords: boolean
    selectedRecords: string[]
    selectedSomeRecords: boolean
    t: (token: string) => string
}

export default function TableView(props: TableViewProps) {
    const {
        filteredRecords,
        handleLimitChange,
        handlePageChange,
        handleSelectAllRecords,
        handleSelectOneRecord,
        limit,
        page,
        paginatedRecords,
        selectedAllRecords,
        selectedRecords,
        selectedSomeRecords,
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
                            handleSelectAllRecords={handleSelectAllRecords}
                            selectedAllRecords={selectedAllRecords}
                            selectedSomeRecords={selectedSomeRecords}
                            t={t}
                        />

                        <TableBody>
                            {/* Create The Table Rows From The Paginated Data */}
                            {paginatedRecords.map((item) => (
                                <TableRecord
                                    handleSelectOneRecord={handleSelectOneRecord}
                                    key={item.name}
                                    record={item}
                                    selectedRecords={selectedRecords}
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
                    page={page} //  MUI TablePagination page starts at 0
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    slotProps={{
                        select: {
                            size: "small",
                            sx: {
                                p: 0,
                            },
                            variant: "outlined",
                        },
                    }}
                />
            </Box>
        </>
    )
}
