import { Box, Typography } from "@mui/material"

type NoViewProps = {
    t: (token: string) => string
}

export default function NoView({ t }: NoViewProps) {
    return (
        <Box
            sx={{
                textAlign: "center",
                p: { xs: 2, sm: 3 },
            }}
        >
            <Typography
                align="center"
                variant="h4"
                color="text.secondary"
                fontWeight={500}
                sx={{
                    my: { xs: 2, sm: 3, md: 5 },
                }}
                gutterBottom
            >
                {t("Choose between Table view or Grid views for displaying the records.")}
            </Typography>
        </Box>
    )
}
