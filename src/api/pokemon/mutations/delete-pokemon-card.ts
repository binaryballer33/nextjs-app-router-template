/* eslint-disable no-console */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

import QUERY_KEYS from "src/api/query-keys"
import { deleteOrUpdateCardRequestSchema } from "src/models/cards/card"
import { PokemonCard } from "src/models/cards/pokemon"
import QUERY_ROUTES from "src/router/api-routes"

export async function deletePokemonCard(cardId: number) {
    return (await axios.delete(QUERY_ROUTES.DELETE_POKEMON_CARD_BY_ID(cardId))).data
}

type MutationContext = {
    staleCache?: PokemonCard[]
}

export default function useDeletePokemonCardMutation() {
    const queryClient = useQueryClient()

    return useMutation<PokemonCard, Error, PokemonCard, MutationContext>({
        // less expensive, does not re-fetch, uses data in cache
        onMutate: async (card) => {
            // if there's a validation error, the mutation will not be called and the onError will be called
            const validatedCard = deleteOrUpdateCardRequestSchema.parse(card)

            toast.loading(`Attempting To Delete Pokemon Card: ${card.name}`, {
                duration: 500,
            })

            // cancel any outgoing re-fetches (so they don't overwrite our optimistic update), this is asynchronous
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })

            // get the previous state of the cache before modifying the cache, for rollback on error purposes
            const staleCache = queryClient.getQueryData<PokemonCard[]>(QUERY_KEYS.ALL_POKEMON_CARDS)

            // optimistically update the cache to what it should be if there are no errors
            queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, (oldCardsCache: PokemonCard[]) =>
                oldCardsCache?.filter((oldCard) => oldCard.id !== validatedCard.id),
            )

            // return a context object with the previous state of the cache in case we need to rollback in the onError
            return { staleCache }
        },

        mutationFn: (card: PokemonCard) => deletePokemonCard(card.id),

        onSuccess(_data, card, _context) {
            toast.success(`Successfully Deleted Pokemon Card: ${card.name}`)
        },

        onError(error, card, context) {
            console.error(`Error Deleting Pokemon Card: ${error}`)
            toast.error(`Error Deleting Pokemon Card ${card.name}`)
            queryClient.setQueryData(QUERY_KEYS.ALL_POKEMON_CARDS, context?.staleCache)
        },

        // more expensive, re-fetches anytime this mutation is called
        onSettled: async (_data, _error, _card, _context) => {
            // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POKEMON_CARDS })
            // await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POKEMON_CARD_BY_ID(data!.id) })
        },
    })
}
