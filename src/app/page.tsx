import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "src/utils/config"

import AvatarAccordion from "src/components/accordions/avatar/avatar"
import Container from "src/components/base/container"
import PageHeading from "src/components/base/page-heading"
import CardsBenefits from "src/components/card-features/cards-benefits"
import FinancialStatus from "src/components/charts-and-graphs/financial-status"
import CardTabs from "src/components/tabs/users-listing/card-tabs"

import prefetchHomePageDataDehydrateState from "src/app/prefetch-home-page-data"

export const metadata = appMetadata.homePage

// TODO: add prisma and basic crud operations to the project
// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
// TODO: make as many components server components as you can in the below code, all of them are top level client components
// TODO: when wanting to show different components that do the same thing, eg Accordions, use Tabs to show the different components, save space on website
// TODO: Make Navigation Bar A Lot Simpler, it has too much nonsense in it, links that are not needed or not important
// TODO: replace use themes and useMediaQuery and replace with <Box component"theComponent" sx={{ display: { xs: "...", sm: "..." }} />
// TODO: remove yugioh app/api route handlers and use react query with server actions instead
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container>
                <PageHeading bottomText="This is a sample page" title="Home Page" />
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
