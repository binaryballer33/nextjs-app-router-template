"use client"

import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

import { useTranslation } from "react-i18next"

import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material"

type PageHeadingProps = {
    actions?: ReactNode
    background?: string
    bottomText?: string
    description?: string
    iconBox?: ReactNode
    sx?: SxProps<Theme>
    title: string
    topSection?: ReactNode
}

export default function PageHeading(props: PageHeadingProps) {
    const { actions, background, bottomText, description, iconBox, sx, title, topSection } = props
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    const { t } = useTranslation()

    return (
        <Stack sx={{ backgroundColor: background, ...sx }}>
            <Stack
                alignItems="center"
                direction={{ md: "row", xs: "column" }}
                display="flex"
                justifyContent="space-between"
                spacing={0}
                width="100%"
            >
                <Stack
                    alignItems="center"
                    className="PageTitleContent"
                    direction={{ md: "row", xs: "column" }}
                    display="flex"
                    overflow="hidden"
                    spacing={2}
                >
                    {iconBox}
                    <Stack overflow="hidden" spacing={0.3} textAlign={{ md: "left", xs: "center" }}>
                        {topSection}
                        <Typography noWrap variant="h3">
                            {t(title)}
                        </Typography>
                        {description && (
                            <Typography color="text.secondary" fontWeight={400} noWrap={mdUp && true} variant="h5">
                                {t(description)}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                {actions}
            </Stack>
            {bottomText && (
                <Box my={2}>
                    <Divider sx={{ mb: 2, width: { md: "75%", xs: 1 } }} />
                    <Typography color="textSecondary" sx={{ textAlign: { md: "left", xs: "center" } }} variant="body1">
                        {t(bottomText)}
                    </Typography>
                </Box>
            )}
        </Stack>
    )
}
