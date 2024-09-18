import { z as zod } from "zod"

export type ResetPassword = zod.infer<typeof ResetPasswordSchema>

export const ResetPasswordSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: "Email Is Required!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
})

export const defaultValuesResetPassword = {
    email: "",
}
