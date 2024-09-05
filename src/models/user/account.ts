import z from "zod"

const AccountSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    userId: z.string().min(1, { message: "UserId Must Be At Least 1 Character Long" }),
    type: z.string().min(1, { message: "Type Must Be At Least 1 Character Long" }),
    provider: z.string().min(1, { message: "Provider Must Be At Least 1 Character Long" }),
    providerAccountId: z.string().min(1, { message: "ProviderAccountId Must Be At Least 1 Character Long" }),
    refreshToken: z.string().optional(),
    accessToken: z.string().optional(),
    expiresAt: z.number().optional(),
    tokenType: z.string().optional(),
    scope: z.string().optional(),
    idToken: z.string().optional(),
    sessionState: z.string().optional(),
})

export default AccountSchema
