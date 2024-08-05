import { z } from "zod"

import { basicCardSchema } from "./basic-card"
import GAME from "./game"

export const yuGiOhCardSchema = basicCardSchema.extend({
    game: z.literal(GAME.YU_GI_OH),
    attack: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
    defense: z.preprocess((val) => Number(val), z.number()), // preprocess to convert to number
})

export const yuGiOhCardSchemaWithoutId = yuGiOhCardSchema.omit({ id: true })

export type YuGiOhCard = z.infer<typeof yuGiOhCardSchema>
export type YuGiOhCardWithoutId = z.infer<typeof yuGiOhCardSchemaWithoutId>

export type YuGiOhCardFromApi = {
    id: number
    name: string
    type: string
    frameType: string
    desc: string
    race: string
    archetype: string
    ygoprodeck_url: string
    card_sets: {
        set_name: string
        set_code: string
        set_rarity: string
        set_rarity_code: string
        set_price: string
    }[]
    card_images: {
        id: number
        image_url: string
        image_url_small: string
        image_url_cropped: string
    }[]
    card_prices: {
        cardmarket_price: string
        tcgplayer_price: string
        ebay_price: string
        amazon_price: string
        coolstuffinc_price: string
    }[]
}

export const yugiohTestCard: YuGiOhCardFromApi = {
    id: 99674361,
    name: "World Legacy Succession",
    type: "Spell Card",
    frameType: "spell",
    desc: 'Target 1 monster in your GY; Special Summon it to your zone a Link Monster points to. You can only activate 1 "World Legacy Succession" per turn.',
    race: "Normal",
    archetype: "World Legacy",
    ygoprodeck_url: "https://ygoprodeck.com/card/world-legacy-succession-9210",
    card_sets: [
        {
            set_name: "2019 Gold Sarcophagus Tin Mega Pack",
            set_code: "MP19-EN038",
            set_rarity: "Prismatic Secret Rare",
            set_rarity_code: "(PScR)",
            set_price: "0",
        },
        {
            set_name: "Flames of Destruction",
            set_code: "FLOD-EN058",
            set_rarity: "Ultra Rare",
            set_rarity_code: "(UR)",
            set_price: "0",
        },
    ],
    card_images: [
        {
            id: 99674361,
            image_url: "https://images.ygoprodeck.com/images/cards/99674361.jpg",
            image_url_small: "https://images.ygoprodeck.com/images/cards_small/99674361.jpg",
            image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/99674361.jpg",
        },
    ],
    card_prices: [
        {
            cardmarket_price: "1.83",
            tcgplayer_price: "3.31",
            ebay_price: "4.95",
            amazon_price: "5.95",
            coolstuffinc_price: "2.99",
        },
    ],
}
