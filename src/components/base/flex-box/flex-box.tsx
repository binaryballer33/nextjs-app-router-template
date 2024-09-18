import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FlexBoxProps = {
    children: ReactNode
    stackOnMobile?: boolean
} & BoxProps

export default function FlexBox(props: FlexBoxProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <Box display="flex" flexDirection={stackOnMobile ? { sm: "row", xs: "column" } : "row"} {...restOfProps}>
            {children}
        </Box>
    )
}
