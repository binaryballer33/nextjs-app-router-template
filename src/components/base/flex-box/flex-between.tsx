import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type FlexBetweenProps = {
    children: ReactNode
    stackOnMobile?: boolean
} & BoxProps

export default function FlexBetween(props: FlexBetweenProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection={stackOnMobile ? { sm: "row", xs: "column" } : "row"}
            justifyContent="space-between"
            my={1}
            {...restOfProps}
        >
            {children}
        </Box>
    )
}
