import type { ChangeEvent } from "react"

import { Box, Card, Unstable_Grid2 as Grid, TablePagination } from "@mui/material"

import NoDataResults from "src/components/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import GridCard from "src/components/tabs/users-listing/blocks/views/grid-view/grid-card"

type GridViewProps = {
    filteredRecords: any[]
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handlePageChange: (event: unknown, newPage: number) => void
    handleSelectOneRecord: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    limit: number
    page: number
    paginatedRecords: any[]
    selectedRecords: string[]
    t: (token: string) => string
}

export default function GridView(props: GridViewProps) {
    const {
        filteredRecords,
        handleLimitChange,
        handlePageChange,
        handleSelectOneRecord,
        limit,
        page,
        paginatedRecords,
        selectedRecords,
        t,
    } = props

    // Return Data Or Text Saying We Couldn't Find Any Records
    return paginatedRecords.length === 0 ? (
        <NoDataResults t={t} />
    ) : (
        <>
            <Grid container spacing={{ sm: 3, xs: 2 }}>
                {paginatedRecords.map((card) => {
                    return (
                        <Grid key={card.id} lg={4} sm={6} xs={12}>
                            {/* Create The Cards */}
                            <GridCard
                                card={card}
                                handleSelectOneRecord={handleSelectOneRecord}
                                selectedRecords={selectedRecords}
                                t={t}
                            />
                        </Grid>
                    )
                })}
            </Grid>

            {/* Pagination Controls */}
            <Card
                sx={{
                    ".MuiTablePagination-select": {
                        py: 0.55,
                    },
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,

                    p: 2,
                }}
            >
                <Box>
                    <b>{limit > filteredRecords.length ? filteredRecords.length : limit}</b> {t("of")}{" "}
                    <b>{filteredRecords.length}</b> <b>{t("Records")}</b>
                </Box>

                {/* Create The Pagination Buttons And Information */}
                <TablePagination
                    component="div"
                    count={filteredRecords.length}
                    labelRowsPerPage=""
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
            </Card>
        </>
    )
}
