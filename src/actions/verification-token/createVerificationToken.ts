"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { randomUUID } from "crypto"

import prisma from "src/utils/database/prisma"

import deleteVerificationTokenById from "src/actions/verification-token/delete-verification-token-by-id"
import getVerificationTokenByEmail from "src/actions/verification-token/get-verification-token-by-email"

export default async function createVerificationToken(email: string): Promise<ServerResponse> {
    const token = randomUUID()
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000)
    const expires = new Date(new Date().getTime() + 3600 * 1000) // expires in 1 hour

    try {
        // if a token exists for the email, delete it so we can create a new one
        const tokenResponse = await getVerificationTokenByEmail(email)
        if ("token" in tokenResponse) {
            if (tokenResponse.token.id) await deleteVerificationTokenById(tokenResponse.token.id)
        }

        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })
        if (!verificationToken) return { error: `Error Creating Verification Token For Email ${email}`, status: 500 }

        return {
            status: 200,
            success: `Successfully Created Verification Token For Email: ${email}`,
            token: verificationToken,
        }
    } catch (error) {
        console.error(`Error Creating Verification Token For Email: ${email}: ${error}`)
        return { error: `Error Creating Verification Token For Email: ${email}`, status: 500 }
    }
}
