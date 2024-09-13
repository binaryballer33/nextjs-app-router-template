"use client"

import type { ChangeEvent } from "react"
import type { User } from "src/mocks/user-mocks"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import { Box, Container, Unstable_Grid2 as Grid, MenuItem, Select, Tab, useMediaQuery, useTheme } from "@mui/material"

import { TabsPills } from "src/components/base/styles/tabs"

import { mockUser } from "src/mocks/user-mocks"

import ProfileCover from "./page-components/profile-cover"
import ActivityCard from "./page-components/tabs/activity-card"
import EditProfileDetails from "./page-components/tabs/edit-profile-details"
import PaymentAndAddresses from "./page-components/tabs/payments-addresses/payment-addresses"
import SettingsNotifications from "./page-components/tabs/settings-notifications"
import SettingsSecurity from "./page-components/tabs/settings-security/settings-security"

export default function UserProfile() {
    const [user] = useState<null | User>(mockUser)
    const { t } = useTranslation()
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))

    const [currentTab, setCurrentTab] = useState<number>(0)

    const handleTabsChange = (_event: ChangeEvent<{}>, value: number): void => setCurrentTab(value)

    const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => setCurrentTab(event.target.value as number)

    // the tabs that will be displayed, array has their tab name(label) and tab order(value)
    const tabs = [
        { label: t("Notifications"), value: 0 },
        { label: t("Edit Profile"), value: 1 },
        { label: t("Activity"), value: 2 },
        { label: t("Passwords/Security"), value: 3 },
        { label: t("Account Credit Cards"), value: 4 },
    ]

    if (!user) return null

    return (
        <Box minWidth="100%">
            <Container maxWidth="xl">
                <Box py={{ sm: 3, xs: 2 }}>
                    {/* User Profile Grid Container */}
                    <Grid container spacing={{ sm: 3, xs: 2 }}>
                        {/* Profile Cover */}
                        <Grid xs={12}>
                            <ProfileCover user={user} />
                        </Grid>

                        {/* Tab User Profile Settings */}
                        <Grid sx={{ mt: 6 }} xs={12}>
                            {smUp ? (
                                <TabsPills
                                    indicatorColor="secondary"
                                    onChange={handleTabsChange}
                                    sx={{
                                        "& .MuiTab-root": {
                                            fontSize: 15,
                                            fontWeight: 500,
                                            textTransform: "none",
                                        },
                                    }}
                                    textColor="secondary"
                                    value={currentTab}
                                >
                                    {tabs.map((tab) => (
                                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                                    ))}
                                </TabsPills>
                            ) : (
                                <Select
                                    fullWidth
                                    // @ts-ignore
                                    onChange={handleSelectChange}
                                    value={currentTab}
                                >
                                    {tabs.map((tab) => (
                                        <MenuItem key={tab.value} value={tab.value}>
                                            {tab.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </Grid>
                        <Grid xs={12}>
                            {currentTab === 0 && <SettingsNotifications />}
                            {currentTab === 1 && <EditProfileDetails />}
                            {currentTab === 2 && <ActivityCard />}
                            {currentTab === 3 && <SettingsSecurity />}
                            {currentTab === 4 && <PaymentAndAddresses />}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}
