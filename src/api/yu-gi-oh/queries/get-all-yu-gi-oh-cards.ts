import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import type { YuGiOhCard } from "src/models/yu-gi-oh/yu-gi-oh"
import routes from "src/router/routes"

export async function getYuGiOhCards(): Promise<YuGiOhCard[]> {
    return (await axios.get(routes.api.yugioh.read)).data.cards
}

export default function useGetYuGiOhCardsQuery() {
    return useQuery<YuGiOhCard[]>({
        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
        queryFn: getYuGiOhCards,
    })
}
