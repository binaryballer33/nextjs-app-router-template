import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FullScreenCenteredContainerProps = {
    children: ReactNode
    minHeight?: "100dvh" | "25dvh" | "50dvh" | "75dvh" | "80dvh" | "85dvh" | "90dvh" | "95dvh"
} & BoxProps

function FullScreenCenteredContainer({ children, minHeight, ...rest }: FullScreenCenteredContainerProps) {
    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            minHeight={minHeight || "100dvh"}
            {...rest}
        >
            {children}
        </Box>
    )
}

export default FullScreenCenteredContainer
