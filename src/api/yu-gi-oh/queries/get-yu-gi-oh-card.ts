import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCard } from "src/models/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/api-routes"

export async function getYugiohCardById(cardId: number) {
    return (await axios.get(QUERY_ROUTES.GET_YUGIOH_CARD_BY_ID(cardId))).data
}

export default function useGetYugiohCardByIdQuery(cardId: number) {
    return useQuery<YuGiOhCard>({
        queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(cardId),
        queryFn: () => getYugiohCardById(cardId),
    })
}
