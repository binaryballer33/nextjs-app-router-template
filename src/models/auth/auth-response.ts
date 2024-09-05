import type { User } from "@prisma/client"
import z from "zod"

export const AuthSuccessSchema = z.object({
    status: z.literal(200),
    success: z.string(),
    error: z.null(),
})

export const AuthErrorSchema = z.object({
    status: z.literal(400).or(z.literal(500)),
    success: z.null(),
    error: z.string(),
})

type AuthSuccessResponse = z.infer<typeof AuthSuccessSchema>
type AuthErrorResponse = z.infer<typeof AuthErrorSchema>

export type AuthResponse = { user: User | null } & (AuthSuccessResponse | AuthErrorResponse)

export function createAuthResponse(responseParams: AuthResponse): AuthResponse {
    const { status, success, error, user } = responseParams

    // if response from the server is successful return 200 status, success msg and user
    if (success !== null) return { status, success, error: null, user }

    // if response from the server is not successful return 400 or 500 status and error msg
    return { status, success: null, error, user }
}
