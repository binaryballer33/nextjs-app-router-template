import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FlexEvenlyProps = {
    children: ReactNode
    stackOnMobile?: boolean
} & BoxProps

export default function FlexEvenly(props: FlexEvenlyProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection={stackOnMobile ? { sm: "row", xs: "column" } : "row"}
            justifyContent="space-evenly"
            {...restOfProps}
        >
            {children}
        </Box>
    )
}
