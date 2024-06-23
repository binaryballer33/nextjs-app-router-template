import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone'
import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone'
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
} from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'
import CountUp from 'react-countup'
import { useTranslation } from 'react-i18next'
import { CardBorderColor } from 'src/components/base/styles/card-border-color'
import { neutral } from 'src/theme/theme'

const CardActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  zIndex: 7,
}))

const BoxComposed = styled(Box)(() => ({
  position: 'relative',
}))

const BoxComposedContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 7,
}))

const BoxComposedImage = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 5,
  filter: 'grayscale(80%)',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
  borderRadius: 'inherit',
}))

const BoxComposedBg = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 6,
  height: '100%',
  width: '100%',
  borderRadius: 'inherit',
}))

const generateRandomData = (): number[] => Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000))

function FinancialStatus() {
  const { t } = useTranslation()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

  return (
    <Card>
      <Grid container>
        <Grid xs={12} lg={5}>
          <BoxComposed
            display="flex"
            alignItems="center"
            sx={{
              width: '100%',
              position: 'relative',
              minHeight: '100%',
              background: 'primary',
            }}
          >
            <BoxComposedBg
              sx={{
                opacity: 0.6,
                background: 'primary',
              }}
            />
            <BoxComposedBg
              sx={{
                opacity: 0.4,
                background: 'primary',
              }}
            />
            <BoxComposedImage
              sx={{
                opacity: 0.4,
                backgroundImage: 'primary',
              }}
            />
            <BoxComposedContent
              display="flex"
              flexGrow={1}
              alignItems="center"
              flexDirection="column"
              p={{ xs: 2, sm: 3, md: 4, xl: 6 }}
              borderRight={{ xs: 0, lg: 1 }}
            >
              <Grid width={'100%'} container spacing={{ xs: 2, sm: 3 }}>
                <Grid xs={12} sm={6} lg={12}>
                  <CardBorderColor borderPosition="bottom" borderColor="primary">
                    <Box px={{ xs: 2, sm: 3 }} pt={{ xs: 2, sm: 3 }} pb={1}>
                      <Typography variant="h3" color="primary">
                        <CountUp
                          start={0}
                          end={32.865}
                          duration={3}
                          separator=""
                          delay={3}
                          decimals={3}
                          decimal=","
                          prefix="$"
                          suffix=""
                        />
                      </Typography>
                      <Typography variant="h4" fontWeight={500}>
                        {t('Income')}
                      </Typography>
                    </Box>
                    <CardActions>
                      <IconButton size="small" color="primary">
                        <MoreHorizTwoToneIcon />
                      </IconButton>
                    </CardActions>
                    <LineChart
                      height={130}
                      leftAxis={null}
                      margin={{ top: 6, bottom: 0, left: 0, right: 0 }}
                      bottomAxis={null}
                      slotProps={{ legend: { hidden: true } }}
                      series={[
                        {
                          data: generateRandomData(),
                          label: 'Laptop sales',
                          area: true,
                          color: theme.palette.primary.main,
                          showMark: false,
                        },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                      sx={{
                        '.MuiLineElement-root': {
                          strokeWidth: 3,
                        },

                        '.MuiAreaElement-root': {
                          fill: "url('#successGradient')",
                          fillOpacity: theme.palette.mode === 'dark' ? 0.76 : 1,
                        },
                      }}
                    >
                      <defs>
                        <linearGradient id="successGradient" gradientTransform="rotate(90)">
                          <stop offset="0%" stopColor={theme.palette.primary.main} />
                          <stop offset="100%" stopColor={theme.palette.background.paper} />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </CardBorderColor>
                </Grid>
                <Grid xs={12} sm={6} lg={12}>
                  <CardBorderColor borderPosition="bottom" borderColor="secondary">
                    <Box px={{ xs: 2, sm: 3 }} pt={{ xs: 2, sm: 3 }} pb={1}>
                      <Typography variant="h3" color="secondary.dark">
                        <CountUp
                          start={0}
                          end={71.684}
                          duration={4}
                          separator=""
                          delay={3}
                          decimals={3}
                          decimal=","
                          prefix="$"
                          suffix=""
                        />
                      </Typography>
                      <Typography variant="h4" fontWeight={500}>
                        {t('Expenses')}
                      </Typography>
                    </Box>
                    <CardActions>
                      <IconButton size="small" color="primary">
                        <MoreHorizTwoToneIcon />
                      </IconButton>
                    </CardActions>
                    <LineChart
                      height={130}
                      leftAxis={null}
                      margin={{ top: 6, bottom: 0, left: 0, right: 0 }}
                      bottomAxis={null}
                      slotProps={{ legend: { hidden: true } }}
                      series={[
                        {
                          data: generateRandomData(),
                          label: 'Total sales',
                          area: true,
                          color: theme.palette.primary.main,
                          showMark: false,
                        },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                      sx={{
                        '.MuiLineElement-root': {
                          strokeWidth: 3,
                        },
                        '.MuiAreaElement-root': {
                          fill: "url('#errorGradient')",
                          fillOpacity: theme.palette.mode === 'dark' ? 0.76 : 1,
                        },
                      }}
                    >
                      <defs>
                        <linearGradient id="errorGradient" gradientTransform="rotate(90)">
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
          xs={12}
          lg={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box p={{ xs: 2, sm: 3 }}>
            <Box>
              <Typography variant="h4">{t('Monthly Financial Status')}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {t("Check how you're doing financially for current month")}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box flexGrow={1} px={2}>
            <BarChart
              height={380}
              margin={{ left: smUp ? 62 : 0, top: 56, right: smUp ? 22 : 0 }}
              series={[
                {
                  data: generateRandomData(),
                  label: 'Completeted',
                  stack: 'total',
                  color: theme.palette.primary.dark,
                },
                {
                  data: generateRandomData(),
                  label: 'Cancelled',
                  stack: 'total',
                  color: theme.palette.secondary.dark,
                },
              ]}
              xAxis={[
                {
                  scaleType: 'band',
                  data: xLabels,
                  //@ts-ignore
                  categoryGapRatio: 0.4,
                  barGapRatio: 0.3,
                },
              ]}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontWeight: 500,
                  },
                  itemMarkWidth: 12,
                  itemMarkHeight: 12,
                  markGap: 6,
                  itemGap: 12,
                  position: { vertical: 'top', horizontal: 'right' },
                  padding: { top: 12 },
                },
              }}
              sx={{
                '.MuiBarElement-root': {
                  fillOpacity: theme.palette.mode === 'dark' ? 0.76 : 1,
                  ry: theme.shape.borderRadius / 1.5,
                },
                '.MuiChartsLegend-mark': {
                  rx: theme.shape.borderRadius,
                },
                '.MuiChartsAxis-left': {
                  display: { xs: 'none', sm: 'block' },
                },
              }}
            />
          </Box>
          <Divider />
          <Box
            p={{ xs: 2, sm: 3 }}
            sx={{
              textAlign: 'center',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : neutral[25],
            }}
          >
            <Button
              size="large"
              sx={{
                px: 2,
                transform: 'translateY(0px)',
                boxShadow: `0px 1px 4px ${alpha(
                  theme.palette.primary.main,
                  0.25,
                )}, 0px 3px 12px 2px ${alpha(theme.palette.primary.main, 0.35)}`,
                fontSize: theme.typography.pxToRem(14),

                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0px 1px 4px ${alpha(
                    theme.palette.primary.main,
                    0.25,
                  )}, 0px 3px 12px 2px ${alpha(theme.palette.primary.main, 0.35)}`,
                },
                '&:active': {
                  boxShadow: 'none',
                },
              }}
              variant="contained"
              startIcon={<PieChartTwoToneIcon />}
            >
              {t('Download report')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default FinancialStatus
