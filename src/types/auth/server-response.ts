import type { User, VerificationToken } from "@prisma/client"

type StatusSuccess = 200 | 201

type StatusClientError = 400 | 403 | 404

type StatusServerError = 500 | 503

type ServerSuccessResponse = {
    status: StatusSuccess
    success: string
}

type ServerUserSuccessResponse = {
    status: StatusSuccess
    success: string
    user: User
}

type ServerEmailSuccessResponse = {
    email: string
    status: StatusSuccess
    success: string
}

type ServerTokenSuccessResponse = {
    status: StatusSuccess
    success: string
    token: VerificationToken
}

type ServerErrorResponse = {
    error: string
    status: StatusClientError | StatusServerError
}

export type ServerResponse =
    | ServerEmailSuccessResponse
    | ServerErrorResponse
    | ServerSuccessResponse
    | ServerTokenSuccessResponse
    | ServerUserSuccessResponse
