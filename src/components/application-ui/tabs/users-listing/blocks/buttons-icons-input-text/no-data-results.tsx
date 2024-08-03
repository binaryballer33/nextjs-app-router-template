import { Typography } from "@mui/material"

type NoDataResultsProps = {
    t: (token: string) => string
}

export default function NoDataResults(props: NoDataResultsProps) {
    const { t } = props

    return (
        <Typography
            sx={{
                py: { xs: 2, sm: 3, md: 6, lg: 10 },
            }}
            variant="h3"
            color="text.secondary"
            align="center"
            fontWeight={500}
        >
            {t("We couldn't find any users matching your search criteria")}
        </Typography>
    )
}
