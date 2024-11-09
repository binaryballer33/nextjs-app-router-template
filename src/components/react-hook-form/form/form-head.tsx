import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography" // ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type FormHeadProps = {
    description?: ReactNode
    icon?: ReactNode
    title: ReactNode
} & BoxProps

export default function FormHead({ description, icon, sx, title, ...other }: FormHeadProps) {
    return (
        <>
            {icon && (
                <Box
                    component="span"
                    display="inline-flex"
                    justifyContent="center"
                    sx={{ mb: 3, mx: "auto", width: 1 }}
                >
                    {icon}
                </Box>
            )}

            <Box
                display="flex"
                flexDirection="column"
                gap={1.5}
                sx={{ mb: 5, textAlign: "center", whiteSpace: "pre-line", ...sx }}
                {...other}
            >
                <Typography variant="h5">{title}</Typography>

                {description && (
                    <Typography sx={{ color: "text.secondary" }} variant="body1">
                        {description}
                    </Typography>
                )}
            </Box>
        </>
    )
}
