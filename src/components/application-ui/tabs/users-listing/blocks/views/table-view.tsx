import { ChangeEvent } from "react"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone"
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Chip,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material"

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
        t,
        handlePageChange,
        handleLimitChange,
        handleSelectOneUser,
        handleSelectAllUsers,
    } = props

    const getUserRoleLabel = (userRole: string) => {
        const map = {
            admin: {
                text: "Administrator",
                color: "primary",
            },
            customer: {
                text: "Customer",
                color: "secondary",
            },
            subscriber: {
                text: "Subscriber",
                color: "info",
            },
        }
        // @ts-ignore
        const { text, color } = map[userRole]
        return { text, color }
    }

    return (
        <>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAllUsers}
                                        indeterminate={selectedSomeUsers}
                                        onChange={handleSelectAllUsers}
                                    />
                                </TableCell>
                                <TableCell>{t("Username")}</TableCell>
                                <TableCell>{t("Name")}</TableCell>
                                <TableCell>{t("Email")}</TableCell>
                                <TableCell align="center">{t("Posts")}</TableCell>
                                <TableCell>{t("Location")}</TableCell>
                                <TableCell>{t("Role")}</TableCell>
                                <TableCell align="center">{t("Actions")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user) => {
                                const { text, color } = getUserRoleLabel(user.role as string)
                                const isUserSelected = selectedItems.includes(user.id)
                                return (
                                    <TableRow hover key={user.id} selected={isUserSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isUserSelected}
                                                onChange={(event) => handleSelectOneUser(event, user.id)}
                                                value={isUserSelected}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight={400}>{user.username}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        mr: 1,
                                                    }}
                                                    src={user.avatar}
                                                />
                                                <Box>
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                    <Link
                                                        variant="subtitle1"
                                                        fontWeight={500}
                                                        href=""
                                                        onClick={(e) => e.preventDefault()}
                                                        underline="hover"
                                                    >
                                                        {user.name}
                                                    </Link>
                                                    <Typography noWrap variant="subtitle2" color="text.secondary">
                                                        {t(user.jobtitle as string)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{user.email}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight={600}>{user.posts}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{t(user.location as string)}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip color={color} label={t(text)} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography noWrap>
                                                <Tooltip title={t("View")} arrow>
                                                    <IconButton color="secondary">
                                                        <LaunchTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={t("Delete")} arrow>
                                                    <IconButton color="secondary">
                                                        <DeleteTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
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
