import { ExitToApp, Settings, ShoppingCart } from '@mui/icons-material'
import { alpha, IconButton, Stack, useTheme } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TooltipLight } from 'src/components/base/styles/tooltips'
import { neutral } from 'src/theme/theme'

interface TooltipProps {
  icon: React.ReactNode
  tooltipText: string
}

const FooterButton: FC<TooltipProps> = ({ icon, tooltipText }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <TooltipLight placement="top" arrow title={t(tooltipText)}>
      <IconButton
        sx={{
          background: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          textAlign: 'left',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: alpha(neutral[600], 0.2),
          '&:hover': {
            color: theme.palette.text.primary,
            background: alpha(theme.palette.primary.main, 0.1),
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        {icon}
      </IconButton>
    </TooltipLight>
  )
}

const SidebarFooter: FC = () => {
  return (
    <Stack
      direction="row"
      py={1}
      spacing={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={6}
      position="relative"
    >
      <FooterButton icon={<Settings fontSize="small" color="primary" />} tooltipText="Account Settings" />
      <FooterButton icon={<ShoppingCart fontSize="small" color="primary" />} tooltipText="Cart" />
      <FooterButton icon={<ExitToApp fontSize="small" color="primary" />} tooltipText="Logout" />
    </Stack>
  )
}

export default SidebarFooter
