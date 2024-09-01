import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import type { YuGiOhCard } from "src/models/yu-gi-oh/yu-gi-oh"
import QUERY_ROUTES from "src/router/api-routes"

export async function getYuGiOhCards(): Promise<YuGiOhCard[]> {
    return (await axios.get(QUERY_ROUTES.GET_YUGIOH_CARDS)).data.cards
}

export default function useGetYuGiOhCardsQuery() {
    return useQuery<YuGiOhCard[]>({
        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
        queryFn: getYuGiOhCards,
    })
}
