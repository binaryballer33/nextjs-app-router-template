import { ChangeEvent } from "react"

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Chip,
    Divider,
    Unstable_Grid2 as Grid,
    IconButton,
    Link,
    styled,
    TablePagination,
    Typography,
} from "@mui/material"
import clsx from "clsx"

import NoDataResults from "src/components/application-ui/tabs/users-listing/blocks/buttons-icons-input-text/no-data-results"

export const CardWrapper = styled(Card)(
    ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
  }

    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.palette.primary.main};
    }
  `,
)

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

    // Return Data Or Text Saying We Couldn't Find Any Users
    return paginatedUsers.length === 0 ? (
        <NoDataResults t={t} />
    ) : (
        <>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {paginatedUsers.map((user) => {
                    const { text, color } = getUserRoleLabel(user.role as string)
                    const isUserSelected = selectedItems.includes(user.id)

                    return (
                        <Grid xs={12} sm={6} lg={4} key={user.id}>
                            {/* Create The Card */}
                            <CardWrapper
                                className={clsx({
                                    "Mui-selected": isUserSelected,
                                })}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        zIndex: "2",
                                    }}
                                >
                                    {/* Create The Label Icon Button */}
                                    <Box
                                        px={2}
                                        pt={2}
                                        display="flex"
                                        alignItems="flex-start"
                                        justifyContent="space-between"
                                    >
                                        <Chip color={color} label={t(text)} />
                                        <IconButton
                                            color="primary"
                                            sx={{
                                                p: 0.5,
                                            }}
                                        >
                                            <MoreVertTwoToneIcon />
                                        </IconButton>
                                    </Box>

                                    {/* Create The Card Avatar, Name, UserName, Email, JobTitle  */}
                                    <Box
                                        p={2}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        alignItems="flex-start"
                                    >
                                        {/* Create The Avatar */}
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                mr: 1.5,
                                                mb: { xs: 2, md: 0 },
                                            }}
                                            src={user.avatar}
                                        />

                                        {/* Name, UserName, Email, JobTitle */}
                                        <Box>
                                            {/* Name And User Name */}
                                            <Box>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <Link
                                                    variant="h6"
                                                    href=""
                                                    onClick={(e) => e.preventDefault()}
                                                    underline="hover"
                                                >
                                                    {user.name}
                                                </Link>{" "}
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    ({user.username})
                                                </Typography>
                                            </Box>

                                            {/* Job Title */}
                                            <Typography
                                                sx={{
                                                    pt: 0.3,
                                                }}
                                                variant="subtitle2"
                                            >
                                                {t(user.jobtitle as string)}
                                            </Typography>

                                            {/* Email */}
                                            <Typography
                                                sx={{
                                                    pt: 1,
                                                }}
                                                variant="h6"
                                                fontWeight={500}
                                            >
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    {/* User Post Count  And Card Check Box */}
                                    <Box
                                        pl={2}
                                        py={1}
                                        pr={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography>
                                            <b>{user.posts}</b> {t("posts")}
                                        </Typography>
                                        <Checkbox
                                            checked={isUserSelected}
                                            onChange={(event) => handleSelectOneUser(event, user.id)}
                                            value={isUserSelected}
                                        />
                                    </Box>
                                </Box>
                            </CardWrapper>
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
