import type { BoxProps } from "@mui/material/Box"

import Box from "@mui/material/Box"

export default function FlexBox({ children, ...props }: BoxProps) {
    return (
        <Box display="flex" {...props}>
            {children}
        </Box>
    )
}
