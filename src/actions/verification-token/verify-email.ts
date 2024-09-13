"use server"

import type { VerifyEmailResponse } from "src/types/auth/verify-email-response"

import prisma from "src/utils/database/prisma"

import getUserByEmail from "src/actions/user/get-user-by-email"
import getVerificationTokenByToken from "src/actions/verification-token/get-verification-token-by-token"

export default async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
    try {
        const existingToken = await getVerificationTokenByToken(token)
        if (!existingToken) return { error: "Token Does Not Exist, Create A New Token", status: 500 }

        const hasExpired = new Date(existingToken.expires) < new Date()
        if (hasExpired) return { error: "Token Has Expired, Create A New Token", status: 500 }

        const existingUser = await getUserByEmail(existingToken.email)
        if (!existingUser) return { error: "User Does Not Exist", status: 500 }
        if (existingUser.emailVerified) return { error: "Email Already Verified", status: 400 }

        // verify the token if the user exists and the token has not expired
        const updatedUser = await prisma.user.update({
            data: {
                email: existingUser.email,
                emailVerified: new Date(),
            },
            where: { id: existingUser.id },
        })

        if (!updatedUser) return { error: "Failed To Verify Email", status: 500 }

        return { status: 200, success: "Email Verified Successfully" }
    } catch (error) {
        console.error(`Something Went Wrong While Verifying Email: ${error}`)

        return { error: "Something Went Wrong While Verifying Email", status: 500 }
    }
}
