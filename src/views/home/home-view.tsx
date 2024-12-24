import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TradesTable from "./blocks/table/trades-table"

export default function HomeView() {
    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="This Is A Sample Page" title="Home Page" />

            <TradesTable />
        </Container>
    )
}
