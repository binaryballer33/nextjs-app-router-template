import type { ButtonProps, TabProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

import { alpha, Button, lighten, styled, Tab } from "@mui/material"

type BaseButtonTabProps = {
    children?: ReactNode
    componentType: "button" | "tab"
}

type ButtonTabProps =
    | ({ componentType: "button" } & BaseButtonTabProps & ButtonProps)
    | ({ componentType: "tab" } & BaseButtonTabProps & TabProps)

const commonStyles = (theme: Theme) => ({
    "&::after": {
        background:
            theme.palette.mode === "dark" ? lighten(theme.palette.neutral[900], 0.035) : theme.palette.common.white,
        bottom: -2,
        content: '""',
        height: 0,
        left: 0,
        position: "absolute",
        width: "100%",
    },
    "&:hover": {
        background:
            theme.palette.mode === "dark" ? alpha(theme.palette.background.paper, 0.6) : theme.palette.common.white,
        borderColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[700], 0.5) : theme.palette.neutral[400],
        color: theme.palette.mode === "dark" ? theme.palette.neutral[200] : theme.palette.neutral[900],
    },
    "&.Mui-selected": {
        "&::after": {
            height: 2,
        },
        background:
            theme.palette.mode === "dark" ? lighten(theme.palette.neutral[900], 0.035) : theme.palette.common.white,
        borderColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[600], 0.4) : theme.palette.neutral[400],
        color: theme.palette.mode === "dark" ? theme.palette.neutral[25] : theme.palette.neutral[900],
    },
    background: theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.01) : theme.palette.neutral[25],
    border:
        theme.palette.mode === "dark"
            ? `1px solid ${alpha(theme.palette.neutral[800], 0.3)}`
            : `1px solid ${theme.palette.neutral[300]}`,
    borderBottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    color: theme.palette.mode === "dark" ? theme.palette.neutral[500] : theme.palette.neutral[800],
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: -0.025,
    marginLeft: 0,
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 2.2),
})

const StyledTab = styled(Tab)(({ theme }) => ({
    ...commonStyles(theme),
    overflow: "visible",
}))

const StyledButton = styled(Button)(({ theme }) => ({
    ...commonStyles(theme),
}))

export default function BaseButtonTab(props: ButtonTabProps) {
    const { children, componentType, ...otherProps } = props

    return componentType === "tab" ? (
        <StyledTab {...(otherProps as TabProps)} />
    ) : (
        <StyledButton {...(otherProps as ButtonProps)}>{children}</StyledButton>
    )
}
