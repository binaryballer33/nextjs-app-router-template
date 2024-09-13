import type { ReactNode } from "react"

import { useTranslation } from "react-i18next"

import { ExitToApp, Settings, ShoppingCart } from "@mui/icons-material"
import { alpha, IconButton, Stack, useTheme } from "@mui/material"

import { TooltipLight } from "src/components/base/styles/tooltips"

type TooltipProps = {
    icon: ReactNode
    tooltipText: string
}

function FooterButton({ icon, tooltipText }: TooltipProps) {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <TooltipLight arrow placement="top" title={t(tooltipText)}>
            <IconButton
                sx={{
                    "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.1),
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                    },
                    background: theme.palette.background.paper,
                    borderColor: theme.palette.primary.dark,
                    borderStyle: "solid",
                    borderWidth: 1,
                    color: theme.palette.text.secondary,
                    textAlign: "left",
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
            alignItems="center"
            direction="row"
            display="flex"
            justifyContent="center"
            position="relative"
            py={1}
            spacing={1}
            zIndex={6}
        >
            <FooterButton icon={<Settings color="primary" fontSize="small" />} tooltipText="Account Settings" />
            <FooterButton icon={<ShoppingCart color="primary" fontSize="small" />} tooltipText="Cart" />
            <FooterButton icon={<ExitToApp color="primary" fontSize="small" />} tooltipText="Logout" />
        </Stack>
    )
}
