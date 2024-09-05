import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import type { YuGiOhCard } from "src/models/yu-gi-oh/yu-gi-oh"
import routes from "src/router/routes"

export async function getYugiohCardById(cardId: number) {
    return (await axios.get(routes.api.yugioh.details(cardId))).data
}

export default function useGetYugiohCardByIdQuery(cardId: number) {
    return useQuery<YuGiOhCard>({
        queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(cardId),
        queryFn: () => getYugiohCardById(cardId),
    })
}
