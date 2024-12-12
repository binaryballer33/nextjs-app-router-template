import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import PlaceholderBox from "@/components/base/placeholder-box"
import CustomTable from "@/components/tables/table"

export const metadata = appMetadata.homePage

// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
// TODO: make as many components server components as you can in the below code, all of them are top level client components
// TODO: when wanting to show different components that do the same thing, eg Accordions, use Tabs to show the different components, save space on website
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container maxWidth="xl">
                <PageHeading bottomText="This Is A Sample Page" title="Home Page" />

                <CustomTable />
                <PlaceholderBox height={600} title="Home Page" />
            </Container>
        </HydrationBoundary>
    )
}
