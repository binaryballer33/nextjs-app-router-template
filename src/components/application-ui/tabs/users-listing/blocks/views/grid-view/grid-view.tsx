import { ChangeEvent } from "react"

import { Box, Card, Unstable_Grid2 as Grid, TablePagination } from "@mui/material"

import NoDataResults from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import GridCard from "src/components/application-ui/tabs/users-listing/blocks/views/grid-view/grid-card"

type GridViewProps = {
    page: number
    limit: number
    selectedRecords: string[]
    paginatedRecords: any[]
    filteredRecords: any[]
    handlePageChange: (event: unknown, newPage: number) => void
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectOneRecord: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    t: (token: string) => string
}

export default function GridView(props: GridViewProps) {
    const {
        page,
        limit,
        selectedRecords,
        paginatedRecords,
        filteredRecords,
        handlePageChange,
        handleLimitChange,
        handleSelectOneRecord,
        t,
    } = props

    // Return Data Or Text Saying We Couldn't Find Any Records
    return paginatedRecords.length === 0 ? (
        <NoDataResults t={t} />
    ) : (
        <>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {paginatedRecords.map((card) => {
                    return (
                        <Grid xs={12} sm={6} lg={4} key={card.id}>
                            {/* Create The Cards */}
                            <GridCard
                                card={card}
                                selectedRecords={selectedRecords}
                                handleSelectOneRecord={handleSelectOneRecord}
                                t={t}
                            />
                        </Grid>
                    )
                })}
            </Grid>

            {/* Pagination Controls */}
            <Card
                sx={{
                    p: 2,
                    mt: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    ".MuiTablePagination-select": {
                        py: 0.55,
                    },
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
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page} //  MUI TablePagination page starts at 0
                    rowsPerPage={limit}
                    labelRowsPerPage=""
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
            </Card>
        </>
    )
}
