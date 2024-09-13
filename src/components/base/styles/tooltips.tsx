import type { PaletteColor, Theme, TooltipProps } from "@mui/material"

import { alpha, styled, Tooltip, tooltipClasses } from "@mui/material"

import { neutral } from "src/theme/theme"

export const TooltipLight = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: alpha(theme.palette.common.white, 0.9),
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
        borderRadius: theme.shape.borderRadius,

        boxShadow: "0 .2rem .8rem rgba(0,0,0,.18), 0 .08rem .15rem rgba(0,0,0,.15)",
        color: neutral[900],
    },
}))

const createStyledTooltip = (colorKey: keyof Theme["palette"]) => {
    return styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => {
            const color = theme.palette[colorKey] as PaletteColor

            return {
                [`& .${tooltipClasses.arrow}`]: {
                    color: color.main,
                },
                [`& .${tooltipClasses.tooltip}`]: {
                    backgroundColor: color.main,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: `0 .2rem .8rem ${alpha(color.main, 0.18)}, 0 .08rem .15rem ${alpha(color.main, 0.15)}`,
                    color: color.contrastText,
                },
            }
        },
    )
}

// Create specific Tooltip components
export const TooltipPrimary = createStyledTooltip("primary")
export const TooltipSecondary = createStyledTooltip("secondary")
export const TooltipError = createStyledTooltip("error")
export const TooltipWarning = createStyledTooltip("warning")
export const TooltipInfo = createStyledTooltip("info")
export const TooltipSuccess = createStyledTooltip("success")
