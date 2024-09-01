import { HydrationBoundary } from "@tanstack/react-query"

import prefetchHomePageDataDehydrateState from "src/app/prefetch-home-page-data"
import AvatarAccordion from "src/components/application-ui/accordions/avatar/avatar"
import CardsBenefits from "src/components/application-ui/card-features/cards-benefits"
import FinancialStatus from "src/components/application-ui/charts-and-graphs/financial-status"
import CardTabs from "src/components/application-ui/tabs/users-listing/card-tabs"
import Container from "src/components/base/container"
import PageHeading from "src/components/base/page-heading"

// TODO: add prisma and basic crud operations to the project
// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
// TODO: make as many components server components as you can in the below code, all of them are top level client components
// TODO: when wanting to show different components that do the same thing, eg Accordions, use Tabs to show the different components, save space on website
// TODO: Make Navigation Bar A Lot Simpler, it has too much nonsense in it, links that are not needed or not important
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container>
                <PageHeading title="Home Page" bottomText="This is a sample page" />
            </Container>

            <Container>
                <CardTabs cards={yugiohCards} />
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
