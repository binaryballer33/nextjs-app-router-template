"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { Resend } from "resend"

import { BACKEND_BASE_URL, RESEND_API_KEY } from "src/utils/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function forgotPasswordEmail(email: string): Promise<ServerResponse> {
    try {
        const resetPasswordLink = `${BACKEND_BASE_URL}/emails/reset-password`
        // const resetPasswordLink = `${BACKEND_BASE_URL}/emails/forgot-password?token=${token}`

        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Reset Your Password",
            text: `Click The Link Below To Reset Your Password:\n${resetPasswordLink}`,
            to: email,
        })

        if (!emailResponse?.data) return { error: "Error Sending Password Reset Email", status: 500 as 500 }

        return { status: 200, success: "Password Reset Email Sent Successfully" }
    } catch (error) {
        console.error(`Error Sending Password Reset Email To ${email}: ${error}`)
        return { error: "Error Sending Password Reset Email", status: 500 }
    }
}
