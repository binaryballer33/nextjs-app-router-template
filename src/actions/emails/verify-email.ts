"use server"

import type { VerifyEmailResponse } from "src/types/auth/verify-email-response"

import prisma from "src/utils/database/prisma"

import getUserByEmail from "src/actions/user/get-user-by-email"
import deleteVerificationTokenById from "src/actions/verification-token/delete-verification-token-by-id"
import getVerificationTokenByToken from "src/actions/verification-token/get-verification-token-by-token"

type VerifyEmailRequest = {
    email: string
    sixDigitCode: string
    token: string
}

export default async function verifyEmail(params: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    try {
        const { email, sixDigitCode, token } = params
        const code = parseInt(sixDigitCode, 10)

        // check if token is valid
        const existingToken = await getVerificationTokenByToken(token)
        if (!existingToken) return { error: "Token Does Not Exist, Create A New Token", status: 500 }

        // check if token has expired
        const hasExpired = new Date(existingToken.expires) < new Date()
        if (hasExpired) return { error: "Token Has Expired, Create A New Token", status: 403 }

        // check if user exists and that the user is not already verified and that the token is for the correct user
        const existingUser = await getUserByEmail(existingToken.email)
        if (!existingUser) return { error: "User Does Not Exist", status: 400 }
        if (existingUser.emailVerified) return { error: "Email Already Verified", status: 400 }
        if (existingUser.email !== existingToken.email) return { error: "User / Token Mismatch", status: 403 }

        // if credentials are incorrect, don't tell hackers which credential is actually invalid
        if (existingUser.email !== email) return { error: "Invalid Email, Code, Or Token", status: 403 }
        if (existingToken.email !== email) return { error: "Invalid Email, Code, Or Token", status: 403 }
        if (code !== existingToken.sixDigitCode) return { error: "Invalid Email, Code, Or Token", status: 403 }

        // verify the token if the user exists and the token has not expired
        const updatedUser = await prisma.user.update({
            data: {
                email: existingUser.email,
                emailVerified: new Date(),
            },
            where: { id: existingUser.id },
        })
        if (!updatedUser) return { error: "Failed To Verify Email", status: 500 }

        // remove the verification token after account verification
        const deletedToken = await deleteVerificationTokenById(existingToken.id)
        if (!deletedToken) return { error: "Failed To Delete Token After Verification", status: 500 }

        return { status: 200, success: "Email Verified Successfully" }
    } catch (error) {
        console.error(`Something Went Wrong While Verifying Email: ${error}`)
        return { error: "Something Went Wrong While Verifying Email", status: 500 }
    }
}
