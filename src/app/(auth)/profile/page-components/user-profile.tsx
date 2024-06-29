'use client'

import { Box, Container, Unstable_Grid2 as Grid, MenuItem, Select, Tab, useMediaQuery, useTheme } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TabsPills } from 'src/components/base/styles/tabs'
import ActivityTotals from './activity-totals'
import { mock_user, User } from './mock-data'
import ProfileCover from './profile-cover'
import ActivityCard from './tabs/activity-card'
import EditProfileDetails from './tabs/edit-profile-details'
import PaymentAndAddresses from './tabs/payments-addresses/payment-addresses'
import SettingsNotifications from './tabs/settings-notifications'
import SettingsSecurity from './tabs/settings-security/settings-security'

function UserProfile() {
  const [user, setUser] = useState<User | null>(mock_user)
  const { t } = useTranslation()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  const [currentTab, setCurrentTab] = useState<number>(0)

  const handleTabsChange = (_event: ChangeEvent<{}>, value: number): void => setCurrentTab(value)

  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => setCurrentTab(event.target.value as number)

  const tabs = [
    { value: 0, label: t('Notifications') },
    { value: 1, label: t('Edit Profile') },
    { value: 2, label: t('Activity') },
    { value: 3, label: t('Passwords/Security') },
    { value: 4, label: t('Account Credit Cards') },
  ]

  if (!user) return null

  return (
    <Box minWidth="100%">
      <Container maxWidth={'xl'}>
        <Box py={{ xs: 2, sm: 3 }}>
          {/* User Profile Grid Container */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Profile Cover */}
            <Grid xs={12}>
              <ProfileCover user={user} />
            </Grid>

            {/* Tab User Profile Settings */}
            <Grid xs={12}>
              {smUp ? (
                <TabsPills
                  onChange={handleTabsChange}
                  value={currentTab}
                  textColor="secondary"
                  indicatorColor="secondary"
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: 15,
                    },
                  }}
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsPills>
              ) : (
                <Select
                  value={currentTab}
                  //@ts-ignore
                  onChange={handleSelectChange}
                  fullWidth
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

export default UserProfile
