import { Typography } from "@mui/material"

type NoDataResultsProps = {
    t: (token: string) => string
}

export default function NoDataResults(props: NoDataResultsProps) {
    const { t } = props

    return (
        <Typography
            align="center"
            color="text.secondary"
            fontWeight={500}
            sx={{
                py: { lg: 10, md: 6, sm: 3, xs: 2 },
            }}
            variant="h3"
        >
            {t("We couldn't find any records matching your search criteria")}
        </Typography>
    )
}
