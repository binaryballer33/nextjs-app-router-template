import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TradeTable from "./blocks/tables/trades/trade-table"
import YugiohTable from "./blocks/tables/yugioh/yugioh-table"

type HomeViewProps = {
    yugiohCards: YuGiOhCard[]
}

export default function HomeView(props: HomeViewProps) {
    const { yugiohCards } = props

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="This Is A Sample Page" title="Home Page" />

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="yugioh">Yugioh</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable />
                </TabsContent>

                <TabsContent value="yugioh">
                    <YugiohTable yugiohCards={yugiohCards} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
