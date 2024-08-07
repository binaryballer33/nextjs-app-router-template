"use client"

import { ReactNode } from "react"

import { Box, Divider, Stack, SxProps, Theme, Typography, useMediaQuery } from "@mui/material"
import { useTranslation } from "react-i18next"

type PageHeadingProps = {
    iconBox?: ReactNode
    title: string
    description?: string
    topSection?: ReactNode
    bottomText?: string
    actions?: ReactNode
    background?: string
    sx?: SxProps<Theme>
}

export default function PageHeading(props: PageHeadingProps) {
    const { iconBox, title, description, topSection, bottomText, actions, background, sx } = props
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    const { t } = useTranslation()

    return (
        <Stack sx={{ backgroundColor: background, ...sx }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={0}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    className="PageTitleContent"
                    spacing={2}
                    display="flex"
                    alignItems="center"
                    overflow="hidden"
                >
                    {iconBox}
                    <Stack textAlign={{ xs: "center", md: "left" }} spacing={0.3} overflow="hidden">
                        {topSection}
                        <Typography variant="h3" noWrap>
                            {t(title)}
                        </Typography>
                        {description && (
                            <Typography variant="h5" color="text.secondary" fontWeight={400} noWrap={mdUp && true}>
                                {t(description)}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                {actions}
            </Stack>
            {bottomText && (
                <Box my={2}>
                    <Divider sx={{ width: { xs: 1, md: "75%" }, mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: "center", md: "left" } }}>
                        {t(bottomText)}
                    </Typography>
                </Box>
            )}
        </Stack>
    )
}
