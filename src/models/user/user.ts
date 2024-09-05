import z from "zod"

import AccountSchema from "src/models/user/account"
import { CartItemSchema } from "src/models/user/cart-item"
import SavedCardSchema from "src/models/user/saved-cards"
import SessionSchema from "src/models/user/session"

const UserSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    email: z.string().email({ message: "Email Must Be Valid" }),
    emailVerified: z.boolean().default(false),
    termsAndConditions: z.literal(true, { message: "You Must Agree To The Terms And Conditions" }),
    firstName: z.string().min(1, { message: "Firstname Must Be At Least 1 Character Long" }),
    lastName: z.string().min(1, { message: "Lastname Must Be At Least 1 Character Long" }),
    encryptedPassword: z.string().optional(),
    imageUrl: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    cartItems: z.array(CartItemSchema).optional(),
    savedCards: z.array(SavedCardSchema).optional(),
    accounts: z.array(AccountSchema),
    sessions: z.array(SessionSchema),
    role: z.literal("USER").or(z.literal("ADMIN")).default("USER"),
})

export type User = z.infer<typeof UserSchema>
