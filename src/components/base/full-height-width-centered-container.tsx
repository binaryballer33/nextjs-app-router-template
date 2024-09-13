import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FullScreenCenteredContainerProps = {
    children: ReactNode
} & BoxProps

function FullScreenCenteredContainer({ children, ...rest }: FullScreenCenteredContainerProps) {
    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            minHeight="100dvh"
            minWidth="100dvw"
            {...rest}
        >
            {children}
        </Box>
    )
}

export default FullScreenCenteredContainer
