import type { BoxProps } from "@mui/material/Box"

import Box from "@mui/material/Box"

export default function FlexCenter({ children, ...props }: BoxProps) {
    return (
        <Box alignItems="center" display="flex" justifyContent="center" {...props}>
            {children}
        </Box>
    )
}
