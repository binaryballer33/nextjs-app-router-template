"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { VerifyEmailSchema } from "src/types/forms/verify-email"
import VerifyIdSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

import getUserByEmail from "src/actions/user/get-user-by-email"
import deleteVerificationTokenById from "src/actions/verification-token/delete-verification-token-by-id"
import getVerificationTokenByToken from "src/actions/verification-token/get-verification-token-by-token"

type VerifyEmailRequest = {
    email: string
    sixDigitCode: string
    token: string
}

export default async function verifyEmail(params: VerifyEmailRequest): Promise<ServerResponse> {
    try {
        const { email, sixDigitCode, token } = params
        const { email: validatedEmail, sixDigitCode: validatedCode } = VerifyEmailSchema.parse({ email, sixDigitCode })
        const { id: validatedToken } = VerifyIdSchema.parse({ id: token })

        const code = parseInt(validatedCode, 10)

        // check if token is valid
        const existingTokenResponse = await getVerificationTokenByToken(validatedToken)
        if (!("token" in existingTokenResponse)) return existingTokenResponse

        // check if token has expired
        const hasExpired = new Date(existingTokenResponse.token.expires) < new Date()
        if (hasExpired) return { error: "Token Has Expired, Create A New Token", status: 403 }

        // check if user exists and that the user is not already verified and that the token is for the correct user
        const userResponse = await getUserByEmail(existingTokenResponse.token.email)
        if (!("user" in userResponse)) return userResponse
        if (userResponse.user.emailVerified) return { error: "Email Already Verified", status: 400 }
        if (userResponse.user.email !== existingTokenResponse.token.email) {
            return {
                error: "User / Token Mismatch",
                status: 403,
            }
        }

        // if credentials are incorrect, don't tell hackers which credential is actually invalid
        if (userResponse.user.email !== validatedEmail) return { error: "Invalid Email, Code, Or Token", status: 403 }
        if (existingTokenResponse.token.email !== validatedEmail)
            return {
                error: "Invalid Email, Code, Or Token",
                status: 403,
            }
        if (code !== existingTokenResponse.token.sixDigitCode) {
            return {
                error: "Invalid Email, Code, Or Token",
                status: 403,
            }
        }

        // verify the token if the user exists and the token has not expired
        const updatedUser = await prisma.user.update({
            data: {
                email: userResponse.user.email,
                emailVerified: new Date(),
            },
            where: { id: userResponse.user.id },
        })
        if (!updatedUser) return { error: "Failed To Verify Email", status: 500 }

        // remove the verification token after account verification
        const tokenResponse = await deleteVerificationTokenById(existingTokenResponse.token.id)
        if (!("token" in tokenResponse)) return tokenResponse

        return { status: 200, success: "Email Verified Successfully", token: tokenResponse.token }
    } catch (error) {
        console.error(`Something Went Wrong While Verifying Email: ${error}`)
        return { error: "Something Went Wrong While Verifying Email", status: 500 }
    }
}
