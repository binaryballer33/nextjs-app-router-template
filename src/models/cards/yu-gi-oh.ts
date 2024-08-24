import { z } from "zod"

const CardSetSchema = z.object({
    set_name: z.string(),
    set_code: z.string(),
    set_rarity: z.string(),
    set_rarity_code: z.string(),
    set_price: z.string(),
})

const CardImageSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    image_url_small: z.string(),
    image_url_cropped: z.string(),
})

const CardPriceSchema = z.object({
    cardmarket_price: z.string(),
    tcgplayer_price: z.string(),
    ebay_price: z.string(),
    amazon_price: z.string(),
    coolstuffinc_price: z.string(),
})

const MiscInfoSchema = z.object({
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

const YuGiOhCardBaseSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    frameType: z.string(),
    desc: z.string(),
    race: z.string(),
    archetype: z.string().optional(),
    ygoprodeck_url: z.string(),
    banlist_info: z
        .object({
            ban_goat: z.string().optional(),
            ban_ocg: z.string().optional(),
            ban_tcg: z.string().optional(),
        })
        .optional(),
    card_sets: z.array(CardSetSchema).optional(),
    card_images: z.array(CardImageSchema),
    card_prices: z.array(CardPriceSchema),
    misc_info: z.array(MiscInfoSchema).optional(),
})

const LinkCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: z.literal("link"),
    linkval: z.number(),
    linkmarkers: z.array(z.string()),
    attribute: z.string(),
    atk: z.number(),
})

const MonsterCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: z.string().refine((val) => !["link", "spell", "trap"].includes(val)),
    level: z.number(),
    attribute: z.string(),
    atk: z.number(),
    def: z.number(),
})

const PendulumCardSchema = MonsterCardSchema.extend({
    frameType: z.string().regex(/pendulum/i),
    pend_desc: z.string(),
    monster_desc: z.string(),
    scale: z.number(),
})

const SpellOrTrapCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: z.union([z.literal("spell"), z.literal("trap")]),
})

const YuGiOhCardSchema = z.union([PendulumCardSchema, LinkCardSchema, MonsterCardSchema, SpellOrTrapCardSchema])

const YuGiOhCardWithoutIdSchema = z.union([
    LinkCardSchema.omit({ id: true }),
    PendulumCardSchema.omit({ id: true }),
    MonsterCardSchema.omit({ id: true }),
    SpellOrTrapCardSchema.omit({ id: true }),
])

type YuGiOhCardWithoutId = z.infer<typeof YuGiOhCardWithoutIdSchema>
type YuGiOhCard = z.infer<typeof YuGiOhCardSchema>

export { YuGiOhCardSchema, YuGiOhCardWithoutIdSchema }
export type { YuGiOhCard, YuGiOhCardWithoutId }
