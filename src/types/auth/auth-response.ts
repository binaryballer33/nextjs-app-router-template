import type { User } from "@prisma/client"

type AuthSuccessResponse = {
    status: 200 | 201
    success: string
    user: null | User
}

type AuthErrorResponse = {
    error: string
    status: 400 | 403 | 404 | 500 | 503
}

export type AuthResponse = AuthErrorResponse | AuthSuccessResponse
