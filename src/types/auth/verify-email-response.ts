type VerifyEmailSuccessResponse = {
    status: 200 | 201
    success: string
}

type VerifyEmailErrorResponse = {
    error: string
    status: 400 | 403 | 404 | 500 | 503
}

export type VerifyEmailResponse = VerifyEmailErrorResponse | VerifyEmailSuccessResponse
