"use server"

import { Resend } from "resend"

import { BACKEND_BASE_URL, RESEND_API_KEY } from "src/utils/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function sendVerificationEmail(email: string, token: string) {
    try {
        const confirmationLink = `${BACKEND_BASE_URL}/emails/verify-email?token=${token}`

        // TODO: can only send to your email unless you add domain ( implement this later )
        return await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Confirm Your Email",
            text: `Click The Link Below To Confirm Your Email:\n${confirmationLink}`,
            to: email,
        })
    } catch (error) {
        console.error(`Error Sending Verification Email To ${email}: ${error}`)
        return null
    }
}
