import type { ReactNode } from "react"

import type { BoxProps } from "@mui/material/Box"
import Box from "@mui/material/Box"

type FullScreenCenteredContainerProps = BoxProps & {
    children: ReactNode
}

function FullScreenCenteredContainer({ children, ...rest }: FullScreenCenteredContainerProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            minWidth="100dvw"
            minHeight="100dvh"
            {...rest}
        >
            {children}
        </Box>
    )
}

export default FullScreenCenteredContainer
