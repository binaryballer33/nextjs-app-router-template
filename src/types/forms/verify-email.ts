import { z as zod } from "zod"

export const VerifyEmailSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: "Email Is Required!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
    sixDigitCode: zod
        .string()
        .min(1, { message: "Code Is Required!" })
        .min(6, { message: "Code Must Be At Least 6 Characters!" }),
})

export type VerifyEmail = zod.infer<typeof VerifyEmailSchema>

export const defaultValuesVerifyEmail = {
    email: "",
    sixDigitCode: "------",
} as VerifyEmail
