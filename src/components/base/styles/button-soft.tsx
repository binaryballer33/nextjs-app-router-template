import { alpha, Button, styled } from "@mui/material"
import { ReactNode } from "react"

type ButtonColor = "primary" | "error" | "success" | "secondary" | "warning" | "info"

type ButtonColorProps = {
  color?: ButtonColor
  children?: ReactNode
}

const ButtonSoft = styled(Button)<ButtonColorProps>(({ theme, color }) => {
  const computedColor = color ? theme.palette[color].main : theme.palette.primary.main

  return {
    backgroundColor: alpha(computedColor, 0.08),
    color: computedColor,

    "&:hover": {
      backgroundColor: alpha(computedColor, 0.12),
      color: computedColor,
    },

    "&:disabled": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
    },
  }
})

export default ButtonSoft
