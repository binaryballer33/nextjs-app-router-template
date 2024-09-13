import type { ChangeEvent, MouseEvent } from "react"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import { format, subDays, subHours, subWeeks } from "date-fns"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"

import {
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material"

import PaginationActions from "src/components/pagination/simple-pagination/pagination-actions"

export default function SettingsSecurity() {
    const { t } = useTranslation()
    const theme = useTheme()

    const [page, setPage] = useState(2)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const logs = [
        {
            browser: " Safari/537.36",
            date: subDays(new Date(), 2).getTime(),
            id: 1,
            ipaddress: "3.70.73.142",
            location: "United States",
        },
        {
            browser: "Chrome/36.0.1985.67",
            date: subDays(new Date(), 6).getTime(),
            id: 2,
            ipaddress: "138.13.136.179",
            location: "China",
        },
        {
            browser: "Googlebot/2.1",
            date: subHours(new Date(), 15).getTime(),
            id: 3,
            ipaddress: "119.229.170.253",
            location: "China",
        },
        {
            browser: "AppleWebKit/535.1",
            date: subDays(new Date(), 4).getTime(),
            id: 4,
            ipaddress: "206.8.99.49",
            location: "Philippines",
        },
        {
            browser: "Mozilla/5.0",
            date: subWeeks(new Date(), 3).getTime(),
            id: 5,
            ipaddress: "235.40.59.85",
            location: "China",
        },
    ]

    return (
        <Card>
            <CardHeader
                subheader={t("Recent sign in activity logs")}
                subheaderTypographyProps={{}}
                title={t("Access Logs")}
                titleTypographyProps={{}}
            />
            <Divider />
            <TableContainer
                sx={{
                    td: {
                        whiteSpace: "nowrap",
                    },
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Browser")}</TableCell>
                            <TableCell>{t("IP Address")}</TableCell>
                            <TableCell>{t("Location")}</TableCell>
                            <TableCell>{t("Date/Time")}</TableCell>
                            <TableCell align="right">{t("Actions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow hover key={log.id}>
                                <TableCell>{log.browser}</TableCell>
                                <TableCell>{log.ipaddress}</TableCell>
                                <TableCell>{log.location}</TableCell>
                                <TableCell>{format(log.date, "dd MMMM, yyyy - h:mm:ss a")}</TableCell>
                                <TableCell align="right">
                                    <Tooltip arrow placement="top" title={t("Delete")}>
                                        <IconButton
                                            color="inherit"
                                            size="small"
                                            sx={{
                                                "&:hover": {},
                                                color: theme.palette.error.main,
                                            }}
                                        >
                                            <DeleteTwoToneIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardActions
                sx={{
                    ".MuiTablePagination-spacer": {
                        display: "none",
                    },
                    ".MuiTablePagination-toolbar": {
                        justifyContent: "space-between",
                    },

                    p: 2,
                }}
            >
                <Typography color="text.secondary" sx={{ pr: 1 }} variant="subtitle2">
                    Showing
                </Typography>
                <TablePagination
                    // @ts-ignore
                    ActionsComponent={PaginationActions}
                    component="div"
                    count={80}
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
