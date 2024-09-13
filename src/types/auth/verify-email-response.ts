type VerifyEmailSuccessResponse = {
    status: 200 | 201
    success: string
}

type VerifyEmailErrorResponse = {
    error: string
    status: 400 | 500
}

export type VerifyEmailResponse = VerifyEmailErrorResponse | VerifyEmailSuccessResponse
