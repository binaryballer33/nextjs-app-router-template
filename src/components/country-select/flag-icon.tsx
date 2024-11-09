import type { BoxProps } from "@mui/material/Box"
import type { SxProps, Theme } from "@mui/material/styles"

import { forwardRef } from "react"

import Box from "@mui/material/Box"

const iconifyClasses = {
    flag: "mnl__icon__flag",
    root: "mnl__icon__root",
}

export type FlagIconProps = {
    code?: string
} & BoxProps

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>(({ className, code, sx, ...other }, ref) => {
    const baseStyles: SxProps<Theme> = {
        alignItems: "center",
        bgcolor: "background.neutral",
        borderRadius: "5px",
        display: "inline-flex",
        flexShrink: 0,
        height: 20,
        justifyContent: "center",
        overflow: "hidden",
        width: 26,
    }

    if (!code) {
        return null
    }

    return (
        <Box
            className={iconifyClasses.flag.concat(className ? ` ${className}` : "")}
            component="span"
            ref={ref}
            sx={{ ...baseStyles, ...sx }}
            {...other}
        >
            <Box
                alt={code}
                component="img"
                loading="lazy"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code?.toUpperCase()}.svg`}
                sx={{
                    height: 1,
                    maxWidth: "unset",
                    objectFit: "cover",
                    width: 1,
                }}
            />
        </Box>
    )
})
