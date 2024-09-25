"use server"

import type { ServerResponse } from "src/types/auth/server-response"
import type { VerifyEmail } from "src/types/forms/verify-email"

import { VerifyEmailSchema } from "src/types/forms/verify-email"
import VerifyIdSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

import getUserByEmail from "src/actions/user/get-user-by-email"
import deleteVerificationTokenById from "src/actions/verification-token/delete-verification-token-by-id"
import getVerificationTokenByToken from "src/actions/verification-token/get-verification-token-by-token"

type VerifyEmailParams = {
    token: string
} & VerifyEmail

export default async function verifyEmail(params: VerifyEmailParams): Promise<ServerResponse> {
    try {
        const { email, sixDigitCode: validatedCode } = VerifyEmailSchema.parse(params)
        const { id: token } = VerifyIdSchema.parse({ id: params.token })

        // check if the token is valid
        const existingTokenResponse = await getVerificationTokenByToken(token)
        if (!("token" in existingTokenResponse)) return existingTokenResponse

        // check if the token has expired
        const hasExpired = new Date(existingTokenResponse.token.expires) < new Date()
        if (hasExpired) return { error: "Account Verification Token Has Expired, Create A New Token", status: 403 }

        // check if the user exists and that the user is not already verified and that the token is for the correct user
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
        if (userResponse.user.email !== email) return { error: "Invalid Email, Code, And/Or Token", status: 403 }
        if (existingTokenResponse.token.email !== email)
            return {
                error: "Invalid Email, Code, And/Or Token",
                status: 403,
            }

        const sixDigitCode = parseInt(validatedCode, 10)
        if (sixDigitCode !== existingTokenResponse.token.sixDigitCode) {
            return {
                error: "Invalid Email, Code, And/Or Token",
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

        return { status: 200, success: "Successfully Verified Email", token: tokenResponse.token }
    } catch (error) {
        console.error(`Something Went Wrong While Verifying Email: ${error}`)
        return { error: "Something Went Wrong While Verifying Email", status: 500 }
    }
}
