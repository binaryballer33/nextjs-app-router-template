import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone"
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone"
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone"
import { Box, Card, CardHeader, Divider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { AvatarState } from "src/components/base/styles/avatar"

export default function ActivityTotals() {
    const { t } = useTranslation()

    const activity = [
        {
            title: t("Orders"),
            total: 485,
            lists: 8,
            icon: <ShoppingBagTwoToneIcon fontSize="small" />,
        },
        {
            title: t("Favorites"),
            total: 64,
            lists: 15,
            icon: <FavoriteTwoToneIcon fontSize="small" />,
        },
        {
            title: t("Reviews"),
            total: 642,
            lists: 21,
            icon: <StarTwoToneIcon fontSize="small" />,
        },
    ]

    return (
        <Card sx={{ maxWidth: "95%" }}>
            <CardHeader title={t("Activity")} sx={{ textAlign: "center" }} />
            <Divider />

            {/* Activities */}
            <Box px={2} py={{ xs: 2, sm: 3 }} display="flex" alignItems="flex-start" flexDirection="column">
                {activity.map((activityItem) => (
                    <Box flex={1} key={activityItem.title} minWidth={1}>
                        {/* Avatar And Title */}
                        <Box display="flex">
                            <AvatarState
                                state="primary"
                                isSoft
                                sx={{
                                    width: 42,
                                    height: 42,
                                }}
                            >
                                {activityItem.icon}
                            </AvatarState>
                            <Typography sx={{ pt: 0.7, ml: 2 }} variant="h5">
                                {activityItem.title}
                            </Typography>
                        </Box>

                        {/* Category Totals */}
                        <Box pl={1} pt={1} display="flex" justifyContent="space-between" minWidth={1}>
                            <Box pr={3}>
                                <Typography gutterBottom variant="caption" fontSize={16} color="text.secondary">
                                    {t("Total")}
                                </Typography>
                                <Typography variant="h4">{activityItem.total}</Typography>
                            </Box>
                            <Box display={{ xs: "none", lg: "block" }}>
                                <Typography gutterBottom variant="caption" fontSize={16} color="text.secondary">
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
