"use server"

import { randomUUID } from "crypto"

import prisma from "src/utils/database/prisma"

import deleteVerificationTokenById from "src/actions/verification-token/delete-verification-token-by-id"
import getVerificationTokenByEmail from "src/actions/verification-token/get-verification-token-by-email"

export default async function createVerificationToken(email: string) {
    const token = randomUUID()
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000)
    const expires = new Date(new Date().getTime() + 3600 * 1000) // expires in 1 hour

    try {
        // if a token exists for the email, delete it so we can create a new one
        const existingToken = await getVerificationTokenByEmail(email)
        if (existingToken) await deleteVerificationTokenById(existingToken.id)

        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })

        if (!verificationToken) return null
        return verificationToken
    } catch (error) {
        console.error(`Error Creating Verification Token For Email ${email}: ${error}`)
        return null
    }
}
