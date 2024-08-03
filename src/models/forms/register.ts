import { z as zod } from "zod"

export type OAuthProvider = {
    id: "google" | "github"
    name: string
    logo: string
}

export const RegisterRequestSchema = zod
    .object({
        firstname: zod.string().min(1, { message: "First name is required" }),
        lastname: zod.string().min(1, { message: "Last name is required" }),
        email: zod.string().min(1, { message: "Email is required" }).email(),
        password: zod.string().min(6, { message: "Password should be at least 6 characters" }),
        confirmPassword: zod.string().min(6, { message: "Password should be at least 6 characters" }),
        terms: zod.boolean().refine((value) => value, "You must accept the terms and conditions"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Add a custom validation rule to ensure the password and confirmPassword fields match
        message: "Your passwords don't match",
        path: ["confirmPassword"],
    })

export type RegisterRequest = zod.infer<typeof RegisterRequestSchema>

export const defaultValuesRegisterRequest = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
} satisfies RegisterRequest
