import type { ChangeEvent, MouseEvent } from "react"

import { useState } from "react"

import { Card, CardActions, CardContent, Divider, TablePagination, Typography } from "@mui/material"

import PlaceholderBox from "src/components/base/placeholder-box"
import PaginationActions from "src/components/pagination/simple-pagination/pagination-actions"

export default function Pagination() {
    const [page, setPage] = useState<number>(2)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <Card>
            <CardContent>
                <PlaceholderBox height={128} />
            </CardContent>
            <Divider />
            <CardActions
                sx={{
                    ".MuiTablePagination-spacer": {
                        display: "none",
                    },

                    ".MuiTablePagination-toolbar": {
                        justifyContent: "space-between",
                    },
                }}
            >
                <Typography color="text.secondary" sx={{ pr: 1 }} variant="subtitle2">
                    Showing
                </Typography>
                <TablePagination
                    // @ts-ignore
                    ActionsComponent={PaginationActions}
                    component="div"
                    count={100}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                />
            </CardActions>
        </Card>
    )
}
