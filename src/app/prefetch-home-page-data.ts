"use server"

import { dehydrate } from "@tanstack/react-query"

import createQueryClient from "src/api/query-client-server-component"
import QUERY_KEYS from "src/api/query-keys"
import { getYuGiOhCards } from "src/api/yu-gi-oh/queries/get-all-yu-gi-oh-cards"
import type { YuGiOhCard } from "src/models/cards/yu-gi-oh"

/*
 * Prefetch data for all tabs on server component, so that the data is available immediately no hydration required
 * This is important for SEO and performance, if you want to see the speed difference, comment out the prefetch
 * or comment out the HydrationBoundary or the await keywords on each prefetch
 */
export default async function prefetchHomePageDataDehydrateState() {
    const queryClient = await createQueryClient() // need to create a new queryClient for each request for server components

    // prefetch all yu-gi-oh cards and store the data in the cache
    await queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
        queryFn: getYuGiOhCards,
    })

    // get the yu-gi-oh cards from the cache and return them in case a component needs them
    const yugiohCards = queryClient.getQueryData<YuGiOhCard[]>(QUERY_KEYS.YU_GI_OH_CARDS)

    return {
        // return the dehydrated state of the queryClient and the yu-gi-oh cards from the cache
        dehydratedState: dehydrate(queryClient),
        yugiohCards,
    }
}
