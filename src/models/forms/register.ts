import { z as zod } from "zod"

export type OAuthProvider = {
    id: "google" | "facebook"
    name: string
    logo: string
}

export const RegisterRequestSchema = zod
    .object({
        firstName: zod.string().min(1, { message: "First name is required" }),
        lastName: zod.string().min(1, { message: "Last name is required" }),
        email: zod.string().min(1, { message: "Email is required" }).email(),
        password: zod.string().min(6, { message: "Password should be at least 6 characters" }),
        confirmPassword: zod.string().min(6, { message: "Password should be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your Passwords Don't Match",
        path: ["confirmPassword"],
    })

export type RegisterRequest = zod.infer<typeof RegisterRequestSchema>

// TODO: add terms and conditions later
export const defaultValuesRegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
} satisfies RegisterRequest
