import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FlexCenterProps = {
    children: ReactNode
    stackOnMobile?: boolean
} & BoxProps

export default function FlexCenter(props: FlexCenterProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection={stackOnMobile ? { sm: "row", xs: "column" } : "row"}
            justifyContent="center"
            {...restOfProps}
        >
            {children}
        </Box>
    )
}
