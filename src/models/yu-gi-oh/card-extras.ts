import { z } from "zod"

export const CardSetSchema = z.object({
    set_name: z.string(),
    set_code: z.string(),
    set_rarity: z.string(),
    set_rarity_code: z.string(),
    set_price: z.number(),
})

export const CardImageSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    image_url_small: z.string(),
    image_url_cropped: z.string(),
})

export const CardPriceSchema = z.object({
    cardmarket_price: z.number(),
    tcgplayer_price: z.number(),
    ebay_price: z.number(),
    amazon_price: z.number(),
    coolstuffinc_price: z.number(),
})

export const MiscInfoSchema = z.object({
    beta_name: z.string(),
    views: z.number(),
    viewsweek: z.number(),
    upvotes: z.number(),
    downvotes: z.number(),
    formats: z.array(z.string()),
    tcg_date: z.string(),
    ocg_date: z.string(),
    konami_id: z.number(),
    has_effect: z.number(),
    md_rarity: z.string(),
})

export const BanlistInfoSchema = z
    .object({
        ban_goat: z.string().optional(),
        ban_ocg: z.string().optional(),
        ban_tcg: z.string().optional(),
    })
    .optional()
