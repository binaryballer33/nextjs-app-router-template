"use server"

import type { PasswordResetToken } from "@prisma/client"
import type { ServerResponse } from "src/types/auth/server-response"

import VerifyTokenSchema from "src/types/forms/verify-token"

import { Resend } from "resend"

import { BACKEND_BASE_URL, RESEND_API_KEY } from "src/utils/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function resetPasswordEmail(passwordResetToken: PasswordResetToken): Promise<ServerResponse> {
    try {
        const { email, sixDigitCode, token } = VerifyTokenSchema.parse(passwordResetToken)

        const resetPasswordLink = `${BACKEND_BASE_URL}/emails/reset-password?token=${token}`

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Reset Your Password",
            text: `Click The Link Below To Reset Your Password:\n${resetPasswordLink}\n\nYour Confirmation Code Is: ${sixDigitCode}`,
            to: email,
        })
        if (!emailResponse?.data?.id) return { error: "Error Sending Password Reset Email", status: 500 }

        return {
            email: emailResponse.data.id,
            status: 200,
            success: `Successfully Sent Password Reset Email To:\n ${email}`,
        }
    } catch (error) {
        console.error(`Error Sending Password Reset Email To ${passwordResetToken.email}: ${error}`)
        return { error: "Error Sending Password Reset Email", status: 500 }
    }
}
