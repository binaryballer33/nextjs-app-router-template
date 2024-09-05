import z from "zod"

const SessionSchema = z.object({
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    sessionToken: z.string().min(1, { message: "SessionToken Must Be At Least 1 Character Long" }),
    userId: z.string().min(1, { message: "UserId Must Be At Least 1 Character Long" }),
    expires: z.date(),
})

export default SessionSchema
