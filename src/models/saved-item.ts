import z from "zod"

export const SavedItemSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    userId: z.string().min(1, { message: "User Id Must Be At Least 1 Character Long" }),
    yugiohCardId: z.number().int().gt(0, { message: "Yugioh Card Id Must Be Greater Than 0" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export type SavedItem = z.infer<typeof SavedItemSchema>
export type SavedItemWithoutId = Omit<SavedItem, "id">
