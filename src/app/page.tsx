import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
// import AvatarAccordion from "@/components/accordions/basic-accordion"
// import Container from "@/components/base/container"
// import PageHeading from "@/components/base/page-heading"
// import CardsBenefits from "@/components/card-features/cards-benefits"
import ThemeToggle from "@/components/theme/theme-toggle"
import { appMetadata } from "@/lib/utils/config"
import { HydrationBoundary } from "@tanstack/react-query"

export const metadata = appMetadata.homePage

// TODO: add prisma and basic crud operations to the project
// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
// TODO: make as many components server components as you can in the below code, all of them are top level client components
// TODO: when wanting to show different components that do the same thing, eg Accordions, use Tabs to show the different components, save space on website
// TODO: Make Navigation Bar A Lot Simpler, it has too much nonsense in it, links that are not needed or not important
// TODO: replace use themes and useMediaQuery and replace with <Box component"theComponent" className="" display: { xs: "...", sm: "..." }} />
// TODO: remove yugioh app/api route handlers and use react query with server actions instead
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <ThemeToggle />
            {/* <Container>
                <PageHeading bottomText="This is a sample page" title="Home Page" />
            </Container>


            <Container>
                <CardsBenefits />
            </Container>

            <Container>Put Charts And Graphs Here</Container>

            <Container>
                <AvatarAccordion />
            </Container> */}
        </HydrationBoundary>
    )
}
