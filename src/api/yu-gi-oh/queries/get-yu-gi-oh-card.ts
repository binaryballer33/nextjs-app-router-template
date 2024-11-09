import type { YuGiOhCard } from "src/types/yu-gi-oh/yu-gi-oh"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import routes from "src/routes/routes"

import QUERY_KEYS from "src/api/query-keys"

export async function getYugiohCardById(cardId: number) {
    return (await axios.get(routes.api.yugioh.details(cardId))).data
}

export default function useGetYugiohCardByIdQuery(cardId: number) {
    return useQuery<YuGiOhCard>({
        queryFn: () => getYugiohCardById(cardId),
        queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(cardId),
    })
}
