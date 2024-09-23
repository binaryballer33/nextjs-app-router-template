"use server"

import type { VerificationToken } from "@prisma/client"
import type { ServerResponse } from "src/types/auth/server-response"

import { Resend } from "resend"

import { BACKEND_BASE_URL, RESEND_API_KEY } from "src/utils/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function sendVerificationEmail(verificationToken: VerificationToken): Promise<ServerResponse> {
    const { email, sixDigitCode, token } = verificationToken

    const confirmationLink = `${BACKEND_BASE_URL}/emails/verify-email?token=${token}`

    try {
        // TODO: can only send to your email unless you add domain ( implement this later )
        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Confirm Your Email",
            text: `Click The Link Below To Confirm Your Email:\n${confirmationLink}\n\nYour Confirmation Code Is: ${sixDigitCode}`,
            to: email,
        })

        if (!emailResponse?.data) {
            return { error: `Error Sending Account Verification Email To: ${email}`, status: 500 }
        }

        return {
            status: 200,
            success: `Account Not Yet Verified, Successfully Sent Account Verification Email To: ${email}`,
        }
    } catch (error) {
        console.error(`Error Sending Account Verification Email To: ${email}: ${error}`)
        return { error: `Error Sending Account Verification Email To: ${email}`, status: 500 }
    }
}
