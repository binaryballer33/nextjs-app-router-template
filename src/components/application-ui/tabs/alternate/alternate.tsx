import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  Stack,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import PlaceholderBox from 'src/components/base/placeholder-box'
import { TabsAlternate } from 'src/components/base/styles/tabs'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, minHeight: 300 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const AlternateTabs = () => {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const [value, setValue] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSelectChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <Stack
      justifyContent="center"
      spacing={{ xs: 2, sm: 3 }}
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
    >
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardHeader title="Navigation tabs" />
        <Divider />
        <CardHeader
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : 'neutral.25',
            '.MuiCardHeader-content': {
              overflow: 'visible',
            },
          }}
          disableTypography
          title={
            smUp ? (
              <>
                <TabsAlternate
                  value={Number(value)}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="Analytics" {...a11yProps(0)} />
                  <Tab label="Integrations" {...a11yProps(1)} />
                  <Tab label="Settings" {...a11yProps(2)} />
                  <Tab label="Support" {...a11yProps(3)} />
                </TabsAlternate>
              </>
            ) : (
              <Select value={value} onChange={handleSelectChange} fullWidth>
                <MenuItem value={0}>Analytics</MenuItem>
                <MenuItem value={1}>Integrations</MenuItem>
                <MenuItem value={2}>Settings</MenuItem>
                <MenuItem value={3}>Support</MenuItem>
              </Select>
            )
          }
        />
        <Divider />
        <CustomTabPanel value={value} index={0}>
          <Stack spacing={2}>
            <PlaceholderBox height={300} />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack spacing={2}>
            <PlaceholderBox height={150} />
            <PlaceholderBox height={150} />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Stack spacing={2}>
            <PlaceholderBox height={100} />
            <PlaceholderBox height={100} />
            <PlaceholderBox height={100} />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
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

export default AlternateTabs
