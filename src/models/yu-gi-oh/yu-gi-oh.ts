import { z } from "zod"

import ArchetypeSchema from "./archetype"
import AttributeMonsterCardSchema from "./attribute"
import { BanlistInfoSchema, CardImageSchema, CardPriceSchema, CardSetSchema, MiscInfoSchema } from "./card-extras"
import { TypeMonsterCardSchema, TypeSpellOrTrapCardSchema, TypeYuGiOhCardSchema } from "./card-type"
import {
    FrameTypeMonsterCardSchema,
    FrameTypePendulumCardSchema,
    FrameTypeSpellOrTrapCardSchema,
    FrameTypeYuGiOhCardSchema,
} from "./frame-type"
import { LevelSchema, PendulumScaleSchema } from "./level-and-pendulum-scale"
import { LinkMarkersSchema, LinkValueSchema } from "./linkvalue-and-linkmarkers"
import { RaceMonsterCardSchema, RaceSpellOrTrapCardSchema, RaceYuGiOhCardSchema } from "./race"

const YuGiOhCardBaseSchema = z.object({
    id: z
        .number()
        .refine((val) => val.toString().length >= 4, {
            message: "ID must be at least 4 digits long",
        })
        .refine((val) => val.toString().length <= 9, {
            message: "ID must be at most 9 digits long",
        }),
    frameType: FrameTypeYuGiOhCardSchema,
    type: TypeYuGiOhCardSchema,
    race: RaceYuGiOhCardSchema,
    archetype: ArchetypeSchema.default("None"),
    banlist_info: BanlistInfoSchema,
    card_sets: z.array(CardSetSchema).optional(),
    card_images: z.array(CardImageSchema).optional(),
    card_prices: z.array(CardPriceSchema).optional(),
    misc_info: z.array(MiscInfoSchema).optional(),
    name: z.string().min(1, "Name Must Be At Least 1 Character Long"),
    desc: z.string().min(1, "Description Must Be At Least 1 Character Long"),
    ygoprodeck_url: z.string().min(1, "URL Must Be At Least 1 Character Long"),
    imageUrl: z.string().min(1, "Image URL Must Be At Least 1 Character Long"),
    price: z
        .number()
        .min(0, "Price Must Be Greater Than Or Equal To 0")
        .max(999999, "Price Must Be Less Than Or Equal To 999999"),
})

const LinkCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: z.literal("link"),
    type: z.literal("Link Monster"),
    linkval: LinkValueSchema,
    linkmarkers: LinkMarkersSchema,
    attribute: AttributeMonsterCardSchema,
    atk: z.union([z.number().min(0, "Attack Must Be Greater Than Or Equal To 0"), z.literal("?")]),
})

const MonsterCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: FrameTypeMonsterCardSchema,
    type: TypeMonsterCardSchema,
    race: RaceMonsterCardSchema,
    level: LevelSchema,
    attribute: AttributeMonsterCardSchema,
    atk: z.union([z.number().min(0, "Attack Must Be Greater Than Or Equal To 0"), z.literal("?")]),
    def: z.union([z.number().min(0, "Defense Must Be Greater Than Or Equal To 0"), z.literal("?")]),
})

const PendulumCardSchema = MonsterCardSchema.extend({
    frameType: FrameTypePendulumCardSchema,
    scale: PendulumScaleSchema,
    pend_desc: z.string().min(1, "Pendulum Description Must Be At Least 1 Character Long"),
    monster_desc: z.string().min(1, "Monster Description Must Be At Least 1 Character Long"),
})

const SpellOrTrapCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: FrameTypeSpellOrTrapCardSchema,
    type: TypeSpellOrTrapCardSchema,
    race: RaceSpellOrTrapCardSchema,
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
