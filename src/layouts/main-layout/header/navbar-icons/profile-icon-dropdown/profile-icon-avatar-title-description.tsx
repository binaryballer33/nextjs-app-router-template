import { useTranslation } from "react-i18next"

import { Avatar, Badge, Box, Typography } from "@mui/material"

const user = {
    name: "Shaquille Mandy",
    role: "Software Engineer",
}

export default function ProfileIconDropdownAvatar() {
    const { t } = useTranslation()
    return (
        <Box alignItems="center" display="flex">
            <Badge
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                badgeContent="12"
                color="secondary"
                overlap="circular"
            >
                <Avatar
                    sx={{
                        backgroundColor: "primary.main",
                        color: "text.primary",
                        height: 48,
                        width: 48,
                    }}
                >
                    SM
                </Avatar>
            </Badge>
            <Box mx={1} overflow="hidden">
                <Typography component="div" variant="h5">
                    Shaquille Mandy
                </Typography>
                <Typography color="text.secondary" noWrap variant="subtitle1">
                    {t(user.role)}
                </Typography>
            </Box>
        </Box>
    )
}
