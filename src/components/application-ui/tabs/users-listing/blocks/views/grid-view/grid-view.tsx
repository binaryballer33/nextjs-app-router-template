import { ChangeEvent } from "react"

import { Box, Card, Unstable_Grid2 as Grid, TablePagination } from "@mui/material"

import NoDataResults from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"
import GridCard from "src/components/application-ui/tabs/users-listing/blocks/views/grid-view/grid-card"

type GridViewProps = {
    page: number
    limit: number
    selectedItems: string[]
    paginatedUsers: any[]
    filteredUsers: any[]
    handlePageChange: (event: unknown, newPage: number) => void
    handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSelectOneUser: (event: ChangeEvent<HTMLInputElement>, id: string) => void
    t: (token: string) => string
}

export default function GridView(props: GridViewProps) {
    const {
        page,
        limit,
        selectedItems,
        paginatedUsers,
        filteredUsers,
        handlePageChange,
        handleLimitChange,
        handleSelectOneUser,
        t,
    } = props

    // Return Data Or Text Saying We Couldn't Find Any Users
    return paginatedUsers.length === 0 ? (
        <NoDataResults t={t} />
    ) : (
        <>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {paginatedUsers.map((user) => {
                    return (
                        <Grid xs={12} sm={6} lg={4} key={user.id}>
                            {/* Create The Card */}
                            <GridCard
                                user={user}
                                selectedItems={selectedItems}
                                handleSelectOneUser={handleSelectOneUser}
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
                    <b>{limit > filteredUsers.length ? filteredUsers.length : limit}</b> {t("of")}{" "}
                    <b>{filteredUsers.length}</b> <b>{t("Users")}</b>
                </Box>

                {/* Create The Pagination Buttons And Information */}
                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    labelRowsPerPage=""
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
            </Card>
        </>
    )
}
