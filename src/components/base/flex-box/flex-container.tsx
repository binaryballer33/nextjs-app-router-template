import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

export type FlexContainerProps = {
    children: ReactNode
    flexDirection?: BoxProps["flexDirection"]
    stackOnMobile?: boolean
} & BoxProps

// TODO: make this replace all the functionality from container, like margin and padding and width
export default function FlexContainer(props: FlexContainerProps) {
    const { alignItems, children, flexDirection = "row", justifyContent, stackOnMobile, ...restOfProps } = props

    // Y-Axis should be centered by default, but X-Axis should be modified manually
    const localAlignItems = flexDirection === "column" || flexDirection === "column-reverse" ? "center" : "initial"
    const localJustifyContent = flexDirection === "row" || flexDirection === "row-reverse" ? "initial" : "center"

    // console.log(`FLEX DIRECTION IN FLEX CONTAINER IS: ${flexDirection}`)
    // console.log(`JUSTIFY CONTENT IN FLEX CONTAINER IS: ${localJustifyContent}`)
    // console.log(`ALIGN ITEMS IN FLEX CONTAINER IS: ${localAlignItems}`)

    return (
        <Box
            alignItems={alignItems || localAlignItems}
            display="flex"
            flexDirection={stackOnMobile ? { sm: "row", xs: "column" } : flexDirection}
            gap={2}
            justifyContent={justifyContent || localJustifyContent}
            my={1}
            {...restOfProps}
        >
            {children}
        </Box>
    )
}
