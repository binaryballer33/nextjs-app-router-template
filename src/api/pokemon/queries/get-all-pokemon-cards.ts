import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import QUERY_KEYS from "src/api/query-keys"
import { PokemonCard } from "src/models/cards/pokemon"
import QUERY_ROUTES from "src/router/api-routes"

export async function getPokemonCards() {
    return (await axios.get(QUERY_ROUTES.GET_ALL_POKEMON_CARDS)).data
}

export default function useGetPokemonCardsQuery() {
    return useQuery<PokemonCard[]>({
        queryKey: QUERY_KEYS.ALL_POKEMON_CARDS,
        queryFn: getPokemonCards,
    })
}
