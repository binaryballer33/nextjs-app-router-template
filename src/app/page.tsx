import { HydrationBoundary } from "@tanstack/react-query"

import prefetchHomePageDataDehydrateState from "src/app/prefetch-home-page-data"
import AvatarAccordion from "src/components/application-ui/accordions/avatar/avatar"
import CardsBenefits from "src/components/application-ui/cards-benefits/cards-benefits"
import FinancialStatus from "src/components/application-ui/financial-status/financial-status"
import CardTabs from "src/components/application-ui/tabs/users-listing/card-tabs"
import Container from "src/components/base/container"
import PageHeading from "src/components/base/page-heading"
import YuGiOhCardDynamooseModel from "src/models/dynamoose/yu-gi-oh"

// TODO: add prisma and basic crud operations to the project
// TODO: make as many components server components as you can in the below code, all of them are top level client components
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    const yugiohCardsFromDynamoose = (await YuGiOhCardDynamooseModel.scan().limit(10).exec()).map((card) =>
        card.toJSON(),
    )

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container>
                <PageHeading title="Home Page" bottomText="This is a sample page" />
            </Container>

            <Container>
                <CardTabs cards={yugiohCardsFromDynamoose} />
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
        </HydrationBoundary>
    )
}
