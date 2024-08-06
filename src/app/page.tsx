"use client"

import { Box, Divider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import useGetYuGiOhCardsQuery from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"
import AvatarAccordion from "src/components/application-ui/accordions/avatar/avatar"
import CardsBenefits from "src/components/application-ui/cards-benefits/cards-benefits"
import FinancialStatus from "src/components/application-ui/financial-status/financial-status"
import CardTabs from "src/components/application-ui/tabs/users-listing/card-tabs"
import Container from "src/components/base/container"
import PageHeading from "src/components/base/page-heading"
import { yugiohTestCards } from "src/models/cards/yu-gi-oh"

// TODO: add prisma and basic crud operations to the project
function Page() {
    const { t } = useTranslation()
    // const yugiohCards = useGetYuGiOhCardsQuery()
    //
    // if (yugiohCards.isLoading) return <p>Loading...</p>
    // if (yugiohCards.isError) return <p>Error: {yugiohCards.error.message}</p>
    // if (!yugiohCards.data) return <p>No cards found</p>
    //
    // yugiohCards.data.data.forEach((card, index) => {
    //     console.log(card)
    // })

    return (
        <>
            <Container>
                <PageHeading
                    title="Home Page"
                    bottomSection={
                        <Box my={2}>
                            <Divider sx={{ width: { xs: 1, md: "75%" }, mb: 2 }} />
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                sx={{ textAlign: { xs: "center", md: "left" } }}
                            >
                                {t("This is a sample page")}
                            </Typography>
                        </Box>
                    }
                />
            </Container>

            <Container>
                <CardTabs tabItems={yugiohTestCards} />
            </Container>

            <Container>
                <CardsBenefits />
            </Container>

            <Container>
                <FinancialStatus />
            </Container>

            <Container>
                <AvatarAccordion />
            </Container>
        </>
    )
}

export default Page
