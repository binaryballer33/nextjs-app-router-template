import type { ReactNode } from "react"

import { Badge, styled } from "@mui/material"

type BadgeColor = "error" | "info" | "primary" | "secondary" | "success" | "warning"

type PulseBadgeProps = {
    children?: ReactNode
    color?: BadgeColor
}

const PulseBadge = styled(Badge)<PulseBadgeProps>(({ color, theme }) => {
    const computedColor = color ? theme.palette[color].main : theme.palette.success.main

    return {
        "@keyframes ripple": {
            "0%": {
                opacity: 1,
                transform: "scale(.8)",
            },
            "100%": {
                opacity: 0,
                transform: "scale(2.4)",
            },
        },
        "& .MuiBadge-badge": {
            "&::after": {
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                borderRadius: "50%",
                content: '""',
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
            },
            backgroundColor: computedColor,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            color: computedColor,
        },
    }
})

export default PulseBadge
