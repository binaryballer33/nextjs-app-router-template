"use server"

import getUserByEmail from "src/actions/user/get-user-by-email"
import getVerificationTokenByToken from "src/actions/verification-token/get-verification-token-by-token"
import prisma from "src/utils/database/prisma"

type VerifyEmailResponse = {
    status: number
    success: string
    error: string
}

function verifyEmailResponse(status: number, success: string, error: string): VerifyEmailResponse {
    return { status, success, error }
}

export default async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
    try {
        const existingToken = await getVerificationTokenByToken(token)

        if (!existingToken) return verifyEmailResponse(500, "", "Token Does Not Exist, Create A New Token")

        const hasExpired = new Date(existingToken.expires) < new Date()

        if (hasExpired) return verifyEmailResponse(500, "", "Token Has Expired, Create A New Token")

        const existingUser = await getUserByEmail(existingToken.email)

        if (!existingUser) return verifyEmailResponse(500, "", "User Does Not Exist")

        // verify the token if the user exists and the token has not expired
        const updatedUser = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingUser.email,
            },
        })

        if (!updatedUser) return verifyEmailResponse(500, "", "Failed To Verify Email")

        return verifyEmailResponse(200, "Email Verified Successfully", "")
    } catch (error) {
        console.error(`Something Went Wrong While Verifying Email: ${error}`)
        return verifyEmailResponse(500, "", "Something Went Wrong While Verifying Email")
    }
}
