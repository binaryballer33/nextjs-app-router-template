import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

import { Box, useTheme } from "@mui/material"

import Scrollbar from "src/components/base/scrollbar"

type ScrollableContainerProps = {
    children?: ReactNode
    height?: number
    sx?: SxProps<Theme>
    useCustomScrollbar?: boolean
}

export default function ScrollableContainer(props: ScrollableContainerProps) {
    const { children, height, useCustomScrollbar, ...other } = props
    const theme = useTheme()

    const isDarkMode = theme.palette.mode === "dark"

    const content = useCustomScrollbar ? <Scrollbar dark={isDarkMode}>{children}</Scrollbar> : children

    return (
        <Box height={height || 256} overflow="auto" {...other}>
            {content}
        </Box>
    )
}
