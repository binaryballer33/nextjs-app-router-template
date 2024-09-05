import { z } from "zod"

export const CartItemSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    userId: z.string().min(1, { message: "UserId Must Be At Least 1 Character Long" }),
    yugiohCardId: z.number().int().gt(0, { message: "YugiohCardId Must Be Greater Than 0" }),
    name: z.string().min(1, { message: "Name Must Be At Least 1 Character Long" }),
    desc: z.string().min(1, { message: "Desc Must Be At Least 1 Character Long" }),
    price: z.number().int().gte(0, { message: "Price Must Be Greater Than Or Equal To 0" }),
    quantity: z.number().int().gt(0, { message: "Quantity Must Be Greater Than 0" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export type CartItem = z.infer<typeof CartItemSchema>
export type CartItemWithoutId = Omit<CartItem, "id">
