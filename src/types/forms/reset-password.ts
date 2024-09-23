import { z as zod } from "zod"

export type ResetPassword = zod.infer<typeof ResetPasswordSchema>

export const ResetPasswordSchema = zod
    .object({
        confirmPassword: zod.string().min(6, { message: "New Confirmation Password Must Be At Least 6 Characters!" }),
        password: zod.string().min(6, { message: "New Password Must Be At Least 6 Characters!" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your Passwords Don't Match",
        path: ["confirmPassword"],
    })

export const defaultValuesResetPassword = {
    confirmPassword: "",
    password: "",
} satisfies ResetPassword
