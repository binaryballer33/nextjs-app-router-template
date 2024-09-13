import type { SxProps, Theme } from "@mui/material"

import { useTranslation } from "react-i18next"

import { alpha, Box, Typography, useTheme } from "@mui/material"

type PlaceholderBoxProps = {
    dark?: boolean
    disableHover?: boolean
    fixedHeight?: number
    flex?: number
    height?: number
    sx?: SxProps<Theme>
    title?: string
}

export default function PlaceholderBox(props: PlaceholderBoxProps) {
    const { dark = false, disableHover, fixedHeight, flex, height, sx, title, ...other } = props
    const { t } = useTranslation()
    const theme = useTheme()

    const isDarkMode = theme.palette.mode === "dark" || dark

    const darkBackground = `repeating-linear-gradient(
    -55deg,
    ${alpha(theme.palette.common.black, 0.3)} 0px,
    ${alpha(theme.palette.common.black, 0.3)} 4px,
    ${alpha(theme.palette.neutral[900], 0.3)} 4px,
    ${alpha(theme.palette.neutral[900], 0.3)} 8px
  )`

    const lightBackground = `repeating-linear-gradient(
    -55deg,
    ${alpha(theme.palette.common.white, 0.7)} 0px,
    ${alpha(theme.palette.common.white, 0.7)} 4px,
    ${alpha(theme.palette.neutral[100], 0.7)} 4px,
    ${alpha(theme.palette.neutral[100], 0.7)} 8px
  )`

    const getBorderColor = () => {
        if (!disableHover) return theme.palette.primary.main
        return dark ? theme.palette.neutral[400] : theme.palette.neutral[25]
    }

    return (
        <Box
            sx={{
                ...sx,
                "&:hover": {
                    borderColor: getBorderColor(),
                    // @ts-ignore
                    boxShadow: !disableHover && theme.shadows[7],
                },
                alignItems: "center",
                background: isDarkMode ? darkBackground : lightBackground,
                borderColor: theme.palette.mode === "dark" ? theme.palette.neutral[800] : theme.palette.neutral[500],
                borderRadius: `${theme.shape.borderRadius}px`,
                borderStyle: "dashed",
                borderWidth: 1,
                display: "flex",
                flex: flex ? 1 : 0,
                height: fixedHeight || "100%",
                justifyContent: "center",

                minHeight: height || 40,
            }}
            {...other}
        >
            {title && (
                <Typography fontWeight={600} variant="h3">
                    {t(title)}
                </Typography>
            )}
        </Box>
    )
}
