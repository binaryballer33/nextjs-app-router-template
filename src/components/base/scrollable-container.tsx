import { ReactNode } from "react"

import { Box, SxProps, Theme, useTheme } from "@mui/material"

import Scrollbar from "src/components/base/scrollbar"

type ScrollableContainerProps = {
  height?: number
  children?: ReactNode
  useCustomScrollbar?: boolean
  sx?: SxProps<Theme>
}

export default function ScrollableContainer(props: ScrollableContainerProps) {
  const { height, children, useCustomScrollbar, ...other } = props
  const theme = useTheme()

  const isDarkMode = theme.palette.mode === "dark"

  const content = useCustomScrollbar ? <Scrollbar dark={isDarkMode}>{children}</Scrollbar> : children

  return (
    <Box overflow="auto" height={height || 256} {...other}>
      {content}
    </Box>
  )
}
