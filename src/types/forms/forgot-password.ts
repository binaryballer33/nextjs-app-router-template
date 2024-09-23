import { z as zod } from "zod"

export type ForgotPassword = zod.infer<typeof ForgotPasswordSchema>

export const ForgotPasswordSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: "Email Is Required!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
})

export const defaultValuesForgotPassword = {
    email: "",
}
