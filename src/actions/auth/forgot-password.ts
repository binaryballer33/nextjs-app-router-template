"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import VerifyEmailRequestSchema from "src/types/forms/verify-email-request"

import sendResetPasswordEmail from "src/actions/emails/send-reset-password-email"
import createPasswordResetToken from "src/actions/password-reset-token/create-password-reset-token"
import getUserByEmail from "src/actions/user/get-user-by-email"

export default async function forgotPassword(email: string): Promise<ServerResponse> {
    try {
        const { email: validatedEmail } = VerifyEmailRequestSchema.parse({ email })

        // see if there is a user in the database that has this email
        const userResponse = await getUserByEmail(validatedEmail)
        if (!("user" in userResponse)) return userResponse

        // create a reset token for the user
        const passwordResetTokenResponse = await createPasswordResetToken(userResponse.user.email)
        if (!("token" in passwordResetTokenResponse)) return passwordResetTokenResponse

        return await sendResetPasswordEmail(passwordResetTokenResponse.token)
    } catch (error) {
        console.error(`Error Resetting Password For User With Email ${email}:\n${error}`)
        return { error: `Error Resetting Password For User With Email ${email}`, status: 500 }
    }
}
