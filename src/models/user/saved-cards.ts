import z from "zod"

const SavedCardSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    userId: z.string().min(1, { message: "UserId Must Be At Least 1 Character Long" }),
    cardId: z.string().min(1, { message: "CardId Must Be At Least 1 Character Long" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export default SavedCardSchema
