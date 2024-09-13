import type { AvatarProps, PaletteColor, Theme } from "@mui/material"

import { alpha, Avatar, styled } from "@mui/material"

type PaletteColorKey = "error" | "info" | "primary" | "secondary" | "success" | "warning"

type AvatarStateProps = {
    isSoft?: boolean
    isUpload?: boolean
    state?: "light" | PaletteColorKey
    useShadow?: boolean
} & AvatarProps

const getStateStyles = (theme: Theme, state?: AvatarStateProps["state"], useShadow?: boolean, isSoft?: boolean) => {
    let backgroundColor: string | undefined
    let boxShadow: string | undefined
    let color: string

    const getColorAndShadow = (colorName: PaletteColorKey, shadowStrength: number) => {
        const paletteColor: PaletteColor = theme.palette[colorName] as PaletteColor
        backgroundColor = isSoft ? alpha(paletteColor.main, 0.08) : paletteColor.main
        color = isSoft ? paletteColor.main : paletteColor.contrastText
        boxShadow = useShadow && !isSoft ? theme.shadows[shadowStrength] : undefined
    }

    const shadowStrengths: Record<PaletteColorKey, number> = {
        error: 3,
        info: 5,
        primary: 1,
        secondary: 16,
        success: 2,
        warning: 4,
    }

    switch (state) {
        case "success":
        case "error":
        case "warning":
        case "info":
        case "primary":
        case "secondary":
            getColorAndShadow(state, shadowStrengths[state])
            break
        case "light":
            backgroundColor = alpha(theme.palette.common.white, 0.1)
            color = theme.palette.common.white
            boxShadow = undefined
            break
        default:
            backgroundColor = theme.palette.background.paper
            color = theme.palette.text.secondary
            boxShadow = undefined
            break
    }

    // @ts-ignore
    return { backgroundColor, boxShadow, color }
}

export const AvatarState = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== "state" && prop !== "useShadow" && prop !== "isSoft",
})<AvatarStateProps>(({ isSoft, state, theme, useShadow }) => {
    const { backgroundColor, boxShadow, color } = getStateStyles(theme, state, useShadow, isSoft)
    return {
        backgroundColor,
        boxShadow,
        color,
    }
})

export const AvatarGradient = styled(Avatar)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
    color: theme.palette.common.white,
}))
