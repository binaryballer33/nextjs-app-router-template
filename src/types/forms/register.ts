import { z as zod } from "zod"

export type OAuthProvider = {
    id: "facebook" | "google"
    logo: string
    name: string
}

export const RegisterRequestSchema = zod
    .object({
        confirmPassword: zod.string().min(6, { message: "Password should be at least 6 characters" }),
        email: zod.string().min(1, { message: "Email is required" }).email(),
        firstName: zod.string().min(1, { message: "First name is required" }),
        lastName: zod.string().min(1, { message: "Last name is required" }),
        password: zod.string().min(6, { message: "Password should be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your Passwords Don't Match",
        path: ["confirmPassword"],
    })

export type RegisterRequest = zod.infer<typeof RegisterRequestSchema>

// TODO: add terms and conditions later
export const defaultValuesRegisterRequest = {
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
} satisfies RegisterRequest
