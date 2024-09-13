import { Box, Typography } from "@mui/material"

type NoViewProps = {
    t: (token: string) => string
}

export default function NoView({ t }: NoViewProps) {
    return (
        <Box
            sx={{
                p: { sm: 3, xs: 2 },
                textAlign: "center",
            }}
        >
            <Typography
                align="center"
                color="text.secondary"
                fontWeight={500}
                gutterBottom
                sx={{
                    my: { md: 5, sm: 3, xs: 2 },
                }}
                variant="h4"
            >
                {t("Choose between Table view or Grid views for displaying the records.")}
            </Typography>
        </Box>
    )
}
