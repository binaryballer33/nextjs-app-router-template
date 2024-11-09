import { useTranslation } from "react-i18next"

import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"

import {
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Unstable_Grid2 as Grid,
    Stack,
    Typography,
} from "@mui/material"

export default function EditProfileDetails() {
    const { t } = useTranslation()

    return (
        <Grid container spacing={{ sm: 3, xs: 2 }}>
            <Grid xs={12}>
                <Card>
                    <Box
                        alignItems={{ sm: "center", xs: "flex-start" }}
                        display="flex"
                        flexDirection={{ sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        p={2}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : "neutral.25",
                        }}
                    >
                        <Box mb={{ sm: 0, xs: 2 }}>
                            <Typography variant="h5">{t("Personal details")}</Typography>
                            <Typography variant="subtitle1">
                                {t("Manage informations related to your personal details")}
                            </Typography>
                        </Box>
                        <Button color="secondary" startIcon={<EditTwoToneIcon />} variant="outlined">
                            {t("Edit")}
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent>
                        <Typography variant="subtitle2">
                            <Grid container spacing={1}>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Name")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Typography fontWeight={500} variant="body1">
                                        Craig Donin
                                    </Typography>
                                </Grid>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Date of birth")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Typography fontWeight={500} variant="body1">
                                        15 March 1977
                                    </Typography>
                                </Grid>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Address")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Box
                                        sx={{
                                            maxWidth: { sm: 340, xs: "auto" },
                                        }}
                                    >
                                        <Typography fontWeight={500} variant="body1">
                                            1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California, 93262
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card>
                    <Box
                        alignItems={{ sm: "center", xs: "flex-start" }}
                        display="flex"
                        flexDirection={{ sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        p={2}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : "neutral.25",
                        }}
                    >
                        <Box mb={{ sm: 0, xs: 2 }}>
                            <Typography variant="h5">{t("Account settings")}</Typography>
                            <Typography variant="subtitle2">{t("Manage details related to your account")}</Typography>
                        </Box>
                        <Button color="secondary" startIcon={<EditTwoToneIcon />} variant="outlined">
                            {t("Edit")}
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent>
                        <Typography variant="subtitle2">
                            <Grid container spacing={1}>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Language")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Typography fontWeight={500} variant="body1">
                                        English (US)
                                    </Typography>
                                </Grid>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Timezone")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Typography fontWeight={500} variant="body1">
                                        GMT +2
                                    </Typography>
                                </Grid>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Account status")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Chip
                                        color="success"
                                        label={
                                            <Box alignItems="center" display="flex" fontWeight={600}>
                                                <DoneTwoToneIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                                                {t("Active")}
                                            </Box>
                                        }
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card>
                    <Box
                        alignItems={{ sm: "center", xs: "flex-start" }}
                        display="flex"
                        flexDirection={{ sm: "row", xs: "column" }}
                        justifyContent="space-between"
                        p={2}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : "neutral.25",
                        }}
                    >
                        <Box mb={{ sm: 0, xs: 2 }}>
                            <Typography variant="h5">{t("Email addresses")}</Typography>
                            <Typography variant="subtitle2">
                                {t("Manage details related to your associated email addresses")}
                            </Typography>
                        </Box>
                        <Button color="secondary" startIcon={<EditTwoToneIcon />} variant="outlined">
                            {t("Edit")}
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent>
                        <Typography variant="subtitle2">
                            <Grid container spacing={1}>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Primary email address")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Stack alignItems="center" direction="row" spacing={1}>
                                        <Typography fontWeight={500} lineHeight={1} variant="body1">
                                            example@demo.com
                                        </Typography>

                                        <Chip
                                            color="success"
                                            label={
                                                <Box alignItems="center" display="flex" fontWeight={600}>
                                                    <DoneTwoToneIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                                                    {t("Primary")}
                                                </Box>
                                            }
                                            size="small"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid md={3} sm={4} textAlign={{ sm: "right" }} xs={12}>
                                    <Box pr={{ sm: 3, xs: 2 }}>{t("Secondary email address")}:</Box>
                                </Grid>
                                <Grid md={9} sm={8} xs={12}>
                                    <Typography fontWeight={500} variant="body1">
                                        demo@example.com
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
