import type { SelectChangeEvent } from "@mui/material"
import type { ReactNode, SyntheticEvent } from "react"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import {
    alpha,
    Box,
    Card,
    CardHeader,
    Divider,
    MenuItem,
    Select,
    Stack,
    Tab,
    useMediaQuery,
    useTheme,
} from "@mui/material"

import PlaceholderBox from "src/components/base/placeholder-box"
import { TabsAlternate } from "src/components/base/styles/tabs"

type TabPanelProps = {
    children?: ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, index, value } = props

    return (
        <div hidden={value !== index} role="tabpanel">
            {value === index && <Box sx={{ minHeight: 300, p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        "aria-controls": `simple-tabpanel-${index}`,
        id: `simple-tab-${index}`,
    }
}

export default function AlternateTabs() {
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const [value, setValue] = useState(0)
    const { t } = useTranslation()

    // need event even if not used or component does not work
    const handleTabChange = (_event: SyntheticEvent, newValue: number) => setValue(newValue)
    const handleSelectChange = (event: SelectChangeEvent<number>) => setValue(Number(event.target.value))

    return (
        <Stack
            alignItems="center"
            direction={{ sm: "row", xs: "column" }}
            justifyContent="center"
            spacing={{ sm: 3, xs: 2 }}
        >
            <Card
                sx={{
                    width: "100%",
                }}
            >
                <CardHeader title={t("Navigation tabs")} />
                <Divider />
                <CardHeader
                    disableTypography
                    sx={{
                        ".MuiCardHeader-content": {
                            overflow: "visible",
                        },
                        backgroundColor: (bgColorTheme) =>
                            bgColorTheme.palette.mode === "dark"
                                ? alpha(bgColorTheme.palette.neutral[25], 0.02)
                                : "neutral.25",
                    }}
                    title={
                        smUp ? (
                            <TabsAlternate
                                indicatorColor="secondary"
                                onChange={handleTabChange}
                                textColor="secondary"
                                value={Number(value)}
                                variant="fullWidth"
                            >
                                <Tab label={t("Analytics")} {...a11yProps(0)} />
                                <Tab label={t("Integrations")} {...a11yProps(1)} />
                                <Tab label={t("Settings")} {...a11yProps(2)} />
                                <Tab label={t("Support")} {...a11yProps(3)} />
                            </TabsAlternate>
                        ) : (
                            <Select fullWidth onChange={handleSelectChange} value={value}>
                                <MenuItem value={0}>{t("Analytics")}</MenuItem>
                                <MenuItem value={1}>{t("Integrations")}</MenuItem>
                                <MenuItem value={2}>{t("Settings")}</MenuItem>
                                <MenuItem value={3}>{t("Support")}</MenuItem>
                            </Select>
                        )
                    }
                />
                <Divider />

                {/* Tab 1 */}
                <CustomTabPanel index={0} value={value}>
                    <Stack spacing={2}>
                        <PlaceholderBox height={300} />
                    </Stack>
                </CustomTabPanel>

                {/* Tab 2 */}
                <CustomTabPanel index={1} value={value}>
                    <Stack spacing={2}>
                        <PlaceholderBox height={150} />
                        <PlaceholderBox height={150} />
                    </Stack>
                </CustomTabPanel>

                {/* Tab 3 */}
                <CustomTabPanel index={2} value={value}>
                    <Stack spacing={2}>
                        <PlaceholderBox height={100} />
                        <PlaceholderBox height={100} />
                        <PlaceholderBox height={100} />
                    </Stack>
                </CustomTabPanel>

                {/* Tab 4 */}
                <CustomTabPanel index={3} value={value}>
                    <Stack spacing={2}>
                        <PlaceholderBox height={100} />
                        <PlaceholderBox height={100} />
                        <PlaceholderBox height={100} />
                        <PlaceholderBox height={100} />
                    </Stack>
                </CustomTabPanel>
            </Card>
        </Stack>
    )
}
