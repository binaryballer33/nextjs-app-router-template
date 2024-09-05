import { Box, Card, CardHeader, Divider, Unstable_Grid2 as Grid } from "@mui/material"
import { useTranslation } from "react-i18next"

import MyCardsSelect from "./account-cards-select"
import Addresses from "./addresses"

const data = {
    savedCards: 7,
}

export default function PaymentAndAddresses() {
    const { t } = useTranslation()

    return (
        <>
            <Grid xs={12}>
                <Card>
                    <CardHeader subheader={`${data.savedCards} ${t("saved cards")}`} title={t("Cards")} />
                    <Divider />
                    <Box p={2}>
                        <MyCardsSelect />
                    </Box>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Addresses />
            </Grid>
        </>
    )
}
