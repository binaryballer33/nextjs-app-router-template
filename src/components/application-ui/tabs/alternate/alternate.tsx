import {
  alpha,
  Box,
  Card,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import PlaceholderBox from "src/components/base/placeholder-box"
import { TabsAlternate } from "src/components/base/styles/tabs"

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3, minHeight: 300 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
      justifyContent="center"
      spacing={{ xs: 2, sm: 3 }}
      alignItems="center"
      direction={{ xs: "column", sm: "row" }}
    >
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardHeader title={t("Navigation tabs")} />
        <Divider />
        <CardHeader
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : "neutral.25",
            ".MuiCardHeader-content": {
              overflow: "visible",
            },
          }}
          disableTypography
          title={
            smUp ? (
              <TabsAlternate
                value={Number(value)}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label={t("Analytics")} {...a11yProps(0)} />
                <Tab label={t("Integrations")} {...a11yProps(1)} />
                <Tab label={t("Settings")} {...a11yProps(2)} />
                <Tab label={t("Support")} {...a11yProps(3)} />
              </TabsAlternate>
            ) : (
              <Select value={value} onChange={handleSelectChange} fullWidth>
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
        <CustomTabPanel value={value} index={0}>
          <Stack spacing={2}>
            <PlaceholderBox height={300} />
          </Stack>
        </CustomTabPanel>

        {/* Tab 2 */}
        <CustomTabPanel value={value} index={1}>
          <Stack spacing={2}>
            <PlaceholderBox height={150} />
            <PlaceholderBox height={150} />
          </Stack>
        </CustomTabPanel>

        {/* Tab 3 */}
        <CustomTabPanel value={value} index={2}>
          <Stack spacing={2}>
            <PlaceholderBox height={100} />
            <PlaceholderBox height={100} />
            <PlaceholderBox height={100} />
          </Stack>
        </CustomTabPanel>

        {/* Tab 4 */}
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
