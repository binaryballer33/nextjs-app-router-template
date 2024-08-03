import { ReactNode } from "react"

import { ExitToApp, Settings, ShoppingCart } from "@mui/icons-material"
import { alpha, IconButton, Stack, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

import { TooltipLight } from "src/components/base/styles/tooltips"

type TooltipProps = {
    icon: ReactNode
    tooltipText: string
}

function FooterButton({ icon, tooltipText }: TooltipProps) {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <TooltipLight placement="top" arrow title={t(tooltipText)}>
            <IconButton
                sx={{
                    background: theme.palette.background.paper,
                    color: theme.palette.text.secondary,
                    textAlign: "left",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: theme.palette.primary.dark,
                    "&:hover": {
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

export default function SidebarFooter() {
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
