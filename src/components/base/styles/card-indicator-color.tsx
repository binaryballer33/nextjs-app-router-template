import type { ReactNode } from "react"

import { Card, styled } from "@mui/material"

type indicatorColor = "error" | "info" | "primary" | "secondary" | "success" | "warning"

type CardIndicatorColorProps = {
    children?: ReactNode
    indicatorColor?: indicatorColor
}

const CardIndicatorColor = styled(Card, {
    shouldForwardProp: (prop) => prop !== "indicatorColor" && prop !== "borderPosition",
})<CardIndicatorColorProps>(({ indicatorColor, theme }) => {
    const computedColor = indicatorColor ? theme.palette[indicatorColor].main : theme.palette.primary.main

    const styles: any = {
        "&::before": {
            backgroundColor: computedColor,
            borderRadius: "inherit",
            content: '""',
            height: "60%",
            left: -4,

            position: "absolute",
            top: "20%",
            width: 7,
        },
        overflow: "visible",

        position: "relative",
    }

    return styles
})

export default CardIndicatorColor
