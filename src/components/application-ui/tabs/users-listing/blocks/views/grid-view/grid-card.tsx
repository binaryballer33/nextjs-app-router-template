import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"
import { Avatar, Box, Card, Checkbox, Chip, Divider, IconButton, Link, styled, Typography } from "@mui/material"
import clsx from "clsx"

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

type GridCardProps = {
    user: any
    selectedItems: string[]
    handleSelectOneUser: (event: any, id: string) => void
    t: (token: string) => string
}

function GridCard(props: GridCardProps) {
    const { user, selectedItems, handleSelectOneUser, t } = props
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
    const { text, color } = getUserRoleLabel(user.role as string)
    const isUserSelected = selectedItems.includes(user.id)

    return (
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
                <Box px={2} pt={2} display="flex" alignItems="flex-start" justifyContent="space-between">
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
                <Box p={2} display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="flex-start">
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
                            <Link variant="h6" href="" onClick={(e) => e.preventDefault()} underline="hover">
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
                <Box pl={2} py={1} pr={1} display="flex" alignItems="center" justifyContent="space-between">
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
    )
}

export default GridCard
