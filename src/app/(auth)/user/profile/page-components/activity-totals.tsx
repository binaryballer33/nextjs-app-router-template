import { useTranslation } from "react-i18next"

import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone"
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone"
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone"

import { Box, Card, CardHeader, Divider, Typography } from "@mui/material"

import { AvatarState } from "src/components/base/styles/avatar"

export default function ActivityTotals() {
    const { t } = useTranslation()

    const activity = [
        {
            icon: <ShoppingBagTwoToneIcon fontSize="small" />,
            lists: 8,
            title: t("Orders"),
            total: 485,
        },
        {
            icon: <FavoriteTwoToneIcon fontSize="small" />,
            lists: 15,
            title: t("Favorites"),
            total: 64,
        },
        {
            icon: <StarTwoToneIcon fontSize="small" />,
            lists: 21,
            title: t("Reviews"),
            total: 642,
        },
    ]

    return (
        <Card sx={{ maxWidth: "95%" }}>
            <CardHeader sx={{ textAlign: "center" }} title={t("Activity")} />
            <Divider />

            {/* Activities */}
            <Box alignItems="flex-start" display="flex" flexDirection="column" px={2} py={{ sm: 3, xs: 2 }}>
                {activity.map((activityItem) => (
                    <Box flex={1} key={activityItem.title} minWidth={1}>
                        {/* Avatar And Title */}
                        <Box display="flex">
                            <AvatarState
                                isSoft
                                state="primary"
                                sx={{
                                    height: 42,
                                    width: 42,
                                }}
                            >
                                {activityItem.icon}
                            </AvatarState>
                            <Typography sx={{ ml: 2, pt: 0.7 }} variant="h5">
                                {activityItem.title}
                            </Typography>
                        </Box>

                        {/* Category Totals */}
                        <Box display="flex" justifyContent="space-between" minWidth={1} pl={1} pt={1}>
                            <Box pr={3}>
                                <Typography color="text.secondary" fontSize={16} gutterBottom variant="caption">
                                    {t("Total")}
                                </Typography>
                                <Typography variant="h4">{activityItem.total}</Typography>
                            </Box>
                            <Box display={{ lg: "block", xs: "none" }}>
                                <Typography color="text.secondary" fontSize={16} gutterBottom variant="caption">
                                    {t("Lists")}
                                </Typography>
                                <Typography variant="h4">{activityItem.lists}</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ minWidth: 1, py: 1 }} />
                    </Box>
                ))}
            </Box>
        </Card>
    )
}
