import prefetchHomePageDataDehydrateState from "@/app/prefetch-home-page-data"
import { HydrationBoundary } from "@tanstack/react-query"

import { appMetadata } from "@/lib/config"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"
import CustomTable from "@/components/tables/table"

export const metadata = appMetadata.homePage

// TODO: improve performance later with tools like chrome dev tool lighthouse, use unlighthouse and chrome extension webvitals
export default async function HomePage() {
    const { dehydratedState, yugiohCards = [] } = await prefetchHomePageDataDehydrateState()

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container maxWidth="xl">
                <PageHeading bottomText="This Is A Sample Page" title="Home Page" />
                <CustomTable />
            </Container>
        </HydrationBoundary>
    )
}
