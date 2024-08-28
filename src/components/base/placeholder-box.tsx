import type { SxProps, Theme } from "@mui/material"
import { alpha, Box, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

type PlaceholderBoxProps = {
    title?: string
    height?: number
    fixedHeight?: number
    flex?: number
    dark?: boolean
    disableHover?: boolean
    sx?: SxProps<Theme>
}

export default function PlaceholderBox(props: PlaceholderBoxProps) {
    const { title, height, disableHover, fixedHeight, flex, dark = false, sx, ...other } = props
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
                flex: flex ? 1 : 0,
                borderRadius: `${theme.shape.borderRadius}px`,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: theme.palette.mode === "dark" ? theme.palette.neutral[800] : theme.palette.neutral[500],
                minHeight: height || 40,
                height: fixedHeight || "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDarkMode ? darkBackground : lightBackground,

                "&:hover": {
                    borderColor: getBorderColor(),
                    // @ts-ignore
                    boxShadow: !disableHover && theme.shadows[7],
                },
            }}
            {...other}
        >
            {title && (
                <Typography variant="h3" fontWeight={600}>
                    {t(title)}
                </Typography>
            )}
        </Box>
    )
}
