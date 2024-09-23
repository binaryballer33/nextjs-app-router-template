import type { User, VerificationToken } from "@prisma/client"

type StatusSuccess = 200 | 201

type StatusError = 400 | 403 | 404 | 500 | 503

type ServerSuccessResponse = {
    status: StatusSuccess
    success: string
}

type ServerUserSuccessResponse = {
    status: StatusSuccess
    success: string
    user: User
}
type ServerTokenSuccessResponse = {
    status: StatusSuccess
    success: string
    token: VerificationToken
}

type ServerErrorResponse = {
    error: string
    status: StatusError
}

export type ServerResponse =
    | ServerErrorResponse
    | ServerSuccessResponse
    | ServerTokenSuccessResponse
    | ServerUserSuccessResponse
