import type { BoxProps } from "@mui/material/Box"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

type SearchNotFoundProps = {
    query?: string
} & BoxProps

export default function SearchNotFound({ query, sx, ...other }: SearchNotFoundProps) {
    if (!query) {
        return (
            <Typography sx={sx} variant="body2">
                Please enter keywords
            </Typography>
        )
    }

    return (
        <Box sx={{ borderRadius: 1.5, textAlign: "center", ...sx }} {...other}>
            <Box sx={{ mb: 1, typography: "h6" }}>Not found</Box>

            <Typography variant="body2">
                No results found for &nbsp;
                <strong>{`"${query}"`}</strong>
                .
                <br /> Try checking for typos or using complete words.
            </Typography>
        </Box>
    )
}
