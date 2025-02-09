"use client"

import type { Trade } from "@prisma/client"

import useGetYugiohCardsInfiniteQuery from "@/api/yu-gi-oh/queries/use-get-yu-gi-oh-cards-infinite-query"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Container from "@/components/base/container"
import PageHeading from "@/components/base/page-heading"

import TradeTable from "./blocks/tables/trades/trade-table"
import YugiohTable from "./blocks/tables/yugioh/yugioh-table"

type HomeViewProps = {
    trades: Trade[]
}

export default function HomeView(props: HomeViewProps) {
    const { trades } = props

    const { data: yugiohCardPages, fetchNextPage, hasNextPage, isFetching } = useGetYugiohCardsInfiniteQuery()

    // Flatten all pages of cards into a single array
    const yugiohCards = yugiohCardPages?.pages.flatMap((page) => page) ?? []

    return (
        <Container maxWidth="xl">
            <PageHeading bottomText="This Is A Sample Page" title="Home Page" />

            <Button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()}>
                {isFetching ? "Fetching More Cards..." : "Fetch More Yugioh Cards"}
            </Button>

            <Tabs className="w-full" defaultValue="trades">
                <TabsList className="grid w-full grid-cols-2 border">
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="yugioh">Yugioh</TabsTrigger>
                </TabsList>

                <TabsContent value="trades">
                    <TradeTable trades={trades} />
                </TabsContent>

                <TabsContent value="yugioh">
                    <YugiohTable yugiohCards={yugiohCards} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
