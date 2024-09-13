import type { User } from "@prisma/client"

type AuthSuccessResponse = {
    status: 200 | 201
    success: string
    user: User
}

type AuthErrorResponse = {
    error: string
    status: 400 | 500
}

export type AuthResponse = AuthErrorResponse | AuthSuccessResponse
