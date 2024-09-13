"use client"

import CountUp from "react-countup"
import { useTranslation } from "react-i18next"

import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone"
import PieChartTwoToneIcon from "@mui/icons-material/PieChartTwoTone"

import {
    alpha,
    Box,
    Button,
    Card,
    Divider,
    Unstable_Grid2 as Grid,
    IconButton,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { BarChart } from "@mui/x-charts/BarChart"
import { LineChart } from "@mui/x-charts/LineChart"

import { CardBorderColor } from "src/components/base/styles/card-border-color"

import { neutral } from "src/theme/theme"

const CardActions = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    zIndex: 7,
}))

const BoxComposed = styled(Box)(() => ({
    position: "relative",
}))

const BoxComposedContent = styled(Box)(() => ({
    position: "relative",
    zIndex: 7,
}))

const BoxComposedImage = styled(Box)(() => ({
    backgroundSize: "cover",
    borderRadius: "inherit",
    filter: "grayscale(80%)",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 5,
}))

const BoxComposedBg = styled(Box)(() => ({
    borderRadius: "inherit",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 6,
}))

const generateRandomData = (): number[] => Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))

function FinancialStatus() {
    const { t } = useTranslation()
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))

    const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

    return (
        <Card>
            <Grid container>
                <Grid lg={5} xs={12}>
                    <BoxComposed
                        alignItems="center"
                        display="flex"
                        sx={{
                            background: "primary",
                            minHeight: "100%",
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <BoxComposedBg
                            sx={{
                                background: "primary",
                                opacity: 0.6,
                            }}
                        />
                        <BoxComposedBg
                            sx={{
                                background: "primary",
                                opacity: 0.4,
                            }}
                        />
                        <BoxComposedImage
                            sx={{
                                backgroundImage: "primary",
                                opacity: 0.4,
                            }}
                        />
                        <BoxComposedContent
                            alignItems="center"
                            borderRight={{ lg: 1, xs: 0 }}
                            display="flex"
                            flexDirection="column"
                            flexGrow={1}
                            p={{ md: 4, sm: 3, xl: 6, xs: 2 }}
                        >
                            <Grid container spacing={{ sm: 3, xs: 2 }} width="100%">
                                <Grid lg={12} sm={6} xs={12}>
                                    <CardBorderColor borderColor="primary" borderPosition="bottom">
                                        <Box pb={1} pt={{ sm: 3, xs: 2 }} px={{ sm: 3, xs: 2 }}>
                                            <Typography color="primary" variant="h3">
                                                <CountUp
                                                    decimal=","
                                                    decimals={3}
                                                    delay={3}
                                                    duration={3}
                                                    end={32.865}
                                                    prefix="$"
                                                    separator=""
                                                    start={0}
                                                    suffix=""
                                                />
                                            </Typography>
                                            <Typography fontWeight={500} variant="h4">
                                                {t("Income")}
                                            </Typography>
                                        </Box>
                                        <CardActions>
                                            <IconButton color="primary" size="small">
                                                <MoreHorizTwoToneIcon />
                                            </IconButton>
                                        </CardActions>
                                        <LineChart
                                            bottomAxis={null}
                                            height={130}
                                            leftAxis={null}
                                            margin={{ bottom: 0, left: 0, right: 0, top: 6 }}
                                            series={[
                                                {
                                                    area: true,
                                                    color: theme.palette.primary.main,
                                                    data: generateRandomData(),
                                                    label: "Laptop sales",
                                                    showMark: false,
                                                },
                                            ]}
                                            slotProps={{ legend: { hidden: true } }}
                                            sx={{
                                                ".MuiAreaElement-root": {
                                                    fill: "url('#successGradient')",
                                                    fillOpacity: theme.palette.mode === "dark" ? 0.76 : 1,
                                                },

                                                ".MuiLineElement-root": {
                                                    strokeWidth: 3,
                                                },
                                            }}
                                            xAxis={[{ data: xLabels, scaleType: "point" }]}
                                        >
                                            <defs>
                                                <linearGradient gradientTransform="rotate(90)" id="successGradient">
                                                    <stop offset="0%" stopColor={theme.palette.primary.main} />
                                                    <stop offset="100%" stopColor={theme.palette.background.paper} />
                                                </linearGradient>
                                            </defs>
                                        </LineChart>
                                    </CardBorderColor>
                                </Grid>
                                <Grid lg={12} sm={6} xs={12}>
                                    <CardBorderColor borderColor="secondary" borderPosition="bottom">
                                        <Box pb={1} pt={{ sm: 3, xs: 2 }} px={{ sm: 3, xs: 2 }}>
                                            <Typography color="secondary.dark" variant="h3">
                                                <CountUp
                                                    decimal=","
                                                    decimals={3}
                                                    delay={3}
                                                    duration={4}
                                                    end={71.684}
                                                    prefix="$"
                                                    separator=""
                                                    start={0}
                                                    suffix=""
                                                />
                                            </Typography>
                                            <Typography fontWeight={500} variant="h4">
                                                {t("Expenses")}
                                            </Typography>
                                        </Box>
                                        <CardActions>
                                            <IconButton color="primary" size="small">
                                                <MoreHorizTwoToneIcon />
                                            </IconButton>
                                        </CardActions>
                                        <LineChart
                                            bottomAxis={null}
                                            height={130}
                                            leftAxis={null}
                                            margin={{ bottom: 0, left: 0, right: 0, top: 6 }}
                                            series={[
                                                {
                                                    area: true,
                                                    color: theme.palette.primary.main,
                                                    data: generateRandomData(),
                                                    label: "Total sales",
                                                    showMark: false,
                                                },
                                            ]}
                                            slotProps={{ legend: { hidden: true } }}
                                            sx={{
                                                ".MuiAreaElement-root": {
                                                    fill: "url('#errorGradient')",
                                                    fillOpacity: theme.palette.mode === "dark" ? 0.76 : 1,
                                                },
                                                ".MuiLineElement-root": {
                                                    strokeWidth: 3,
                                                },
                                            }}
                                            xAxis={[{ data: xLabels, scaleType: "point" }]}
                                        >
                                            <defs>
                                                <linearGradient gradientTransform="rotate(90)" id="errorGradient">
                                                    <stop offset="0%" stopColor={theme.palette.primary.main} />
                                                    <stop offset="100%" stopColor={theme.palette.background.paper} />
                                                </linearGradient>
                                            </defs>
                                        </LineChart>
                                    </CardBorderColor>
                                </Grid>
                            </Grid>
                        </BoxComposedContent>
                    </BoxComposed>
                </Grid>
                <Grid
                    lg={7}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    xs={12}
                >
                    <Box p={{ sm: 3, xs: 2 }}>
                        <Box>
                            <Typography variant="h4">{t("Monthly Financial Status")}</Typography>
                            <Typography color="text.secondary" variant="subtitle2">
                                {t("Check how you're doing financially for current month")}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box flexGrow={1} px={2}>
                        <BarChart
                            height={380}
                            margin={{ left: smUp ? 62 : 0, right: smUp ? 22 : 0, top: 56 }}
                            series={[
                                {
                                    color: theme.palette.primary.dark,
                                    data: generateRandomData(),
                                    label: t("Completed"),
                                    stack: "total",
                                },
                                {
                                    color: theme.palette.secondary.dark,
                                    data: generateRandomData(),
                                    label: t("Cancelled"),
                                    stack: "total",
                                },
                            ]}
                            slotProps={{
                                legend: {
                                    itemGap: 12,
                                    itemMarkHeight: 12,
                                    itemMarkWidth: 12,
                                    labelStyle: {
                                        fontWeight: 500,
                                    },
                                    markGap: 6,
                                    padding: { top: 12 },
                                    position: { horizontal: "right", vertical: "top" },
                                },
                            }}
                            sx={{
                                ".MuiBarElement-root": {
                                    fillOpacity: theme.palette.mode === "dark" ? 0.76 : 1,
                                    ry: theme.shape.borderRadius / 1.5,
                                },
                                ".MuiChartsAxis-left": {
                                    display: { sm: "block", xs: "none" },
                                },
                                ".MuiChartsLegend-mark": {
                                    rx: theme.shape.borderRadius,
                                },
                            }}
                            xAxis={[
                                {
                                    barGapRatio: 0.3,
                                    // @ts-ignore
                                    categoryGapRatio: 0.4,
                                    data: xLabels,
                                    scaleType: "band",
                                },
                            ]}
                        />
                    </Box>
                    <Divider />
                    <Box
                        p={{ sm: 3, xs: 2 }}
                        sx={{
                            backgroundColor: (bgColorTheme) =>
                                bgColorTheme.palette.mode === "dark"
                                    ? alpha(bgColorTheme.palette.neutral[25], 0.02)
                                    : neutral[25],
                            textAlign: "center",
                        }}
                    >
                        <Button
                            size="large"
                            startIcon={<PieChartTwoToneIcon />}
                            sx={{
                                "&:active": {
                                    boxShadow: "none",
                                },
                                "&:hover": {
                                    boxShadow: `0px 1px 4px ${alpha(
                                        theme.palette.primary.main,
                                        0.25,
                                    )}, 0px 3px 12px 2px ${alpha(theme.palette.primary.main, 0.35)}`,
                                    transform: "translateY(-2px)",
                                },
                                boxShadow: `0px 1px 4px ${alpha(
                                    theme.palette.primary.main,
                                    0.25,
                                )}, 0px 3px 12px 2px ${alpha(theme.palette.primary.main, 0.35)}`,
                                fontSize: theme.typography.pxToRem(14),

                                px: 2,
                                transform: "translateY(0px)",
                            }}
                            variant="contained"
                        >
                            {t("Download Report")}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default FinancialStatus
