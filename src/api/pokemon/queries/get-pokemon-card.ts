// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
//
// import QUERY_KEYS from "src/api/query-keys"
// import { PokemonCard } from "src/models/cards/pokemon"
// import QUERY_ROUTES from "src/router/api-routes"
//
// export async function getPokemonCardById(cardId: number) {
//     return (await axios.get(QUERY_ROUTES.GET_POKEMON_CARD_BY_ID(cardId))).data
// }
//
// export default function useGetPokemonCardByIdQuery(cardId: number) {
//     return useQuery<PokemonCard>({
//         queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(cardId),
//         queryFn: () => getPokemonCardById(cardId),
//     })
// }
