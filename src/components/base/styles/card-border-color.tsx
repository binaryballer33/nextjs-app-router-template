import type { ReactNode } from "react"

import { Card, styled } from "@mui/material"

export type BorderColor = "error" | "info" | "primary" | "secondary" | "success" | "warning"
type BorderPosition = "bottom" | "top"

type CardBorderColorProps = {
    borderColor?: BorderColor
    borderPosition?: BorderPosition
    children?: ReactNode
}

export const CardBorderColor = styled(Card, {
    shouldForwardProp: (prop) => prop !== "borderColor" && prop !== "borderPosition",
})<CardBorderColorProps>(({ borderColor, borderPosition, theme }) => {
    const computedColor = borderColor ? theme.palette[borderColor].main : theme.palette.primary.main
    const defaultBorderPosition = borderPosition || "bottom"

    const styles: any = {
        "&::before": {
            backgroundColor: computedColor,
            content: '""',
            height: "6px",

            left: "-1px",
            position: "absolute",
            width: "calc(100% + 2px)",

            ...(defaultBorderPosition === "top"
                ? {
                      borderTopLeftRadius: "inherit",
                      borderTopRightRadius: "inherit",
                      top: "-1px",
                  }
                : {
                      borderBottomLeftRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                      bottom: "-2px",
                  }),
        },
        overflow: "visible",

        position: "relative",
    }

    return styles
})
