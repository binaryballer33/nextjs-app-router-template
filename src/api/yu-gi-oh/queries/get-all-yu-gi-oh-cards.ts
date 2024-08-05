import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import { YuGiOhCard } from "src/models/cards/yu-gi-oh"
import QUERY_ROUTES from "src/router/api-routes"

// export async function getYuGiOhCards() {
//     return (await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php")).data
// }

export async function getYuGiOhCards() {
    return (await axios.get(QUERY_ROUTES.GET_ALL_YUGIOH_CARDS)).data
}

export default function useGetYuGiOhCardsQuery() {
    return useQuery<YuGiOhCard[]>({
        queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS,
        queryFn: getYuGiOhCards,
    })
}
