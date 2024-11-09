import type { ReactNode } from "react"

import Box from "@mui/material/Box"

type ContainerProps = {
    children: ReactNode
}

function Container({ children, ...rest }: ContainerProps) {
    return (
        <Box
            margin="0 auto"
            maxWidth={{ lg: 1500, md: 1236, sm: 720 }}
            paddingX={2}
            paddingY={{ md: 8, sm: 6, xs: 4 }}
            width={1}
            {...rest}
        >
            {children}
        </Box>
    )
}

export default Container
