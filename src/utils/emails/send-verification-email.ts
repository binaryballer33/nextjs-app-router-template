import { Resend } from "resend"

import { BACKEND_BASE_URL, RESEND_API_KEY } from "src/utils/secrets"

const resend = new Resend(RESEND_API_KEY)

export default async function sendVerificationEmail(email: string, token: string) {
    try {
        const confirmationLink = `${BACKEND_BASE_URL}/verify-email?token=${token}`

        // TODO: can only send to your email unless you add domain ( implement this later )
        email = "shaqmandy@gmail.com"

        // TODO: figure out why gmail won't deliver emails with links, doesn't matter if its localhost or google.com
        return await resend.emails.send({
            from: "onboarding@resend.dev",
            html: `<p>Click <a href="${confirmationLink}">Here</a> To Confirm Your Email.</p>`,
            subject: "Confirm Your Email",
            to: email,
        })

        // await resend.emails.send({
        //     from: "onboarding@resend.dev",
        //     to: email,
        //     subject: "Confirm Your Email",
        //     html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        // })
    } catch (error) {
        console.error(`Error Sending Verification Email To ${email}: ${error}`)
        return null
    }
}
