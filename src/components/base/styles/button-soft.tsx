import type { ReactNode } from "react"

import { alpha, Button, styled } from "@mui/material"

type ButtonColor = "error" | "info" | "primary" | "secondary" | "success" | "warning"

type ButtonColorProps = {
    children?: ReactNode
    color?: ButtonColor
}

const ButtonSoft = styled(Button)<ButtonColorProps>(({ color, theme }) => {
    const computedColor = color ? theme.palette[color].main : theme.palette.primary.main

    return {
        "&:disabled": {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
        },
        "&:hover": {
            backgroundColor: alpha(computedColor, 0.12),
            color: computedColor,
        },

        backgroundColor: alpha(computedColor, 0.08),

        color: computedColor,
    }
})

export default ButtonSoft
