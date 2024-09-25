"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { randomUUID } from "crypto"

import prisma from "src/utils/database/prisma"

import deletePasswordResetTokenById from "src/actions/password-reset-token/delete-password-reset-token-by-id"
import getPasswordResetTokenByEmail from "src/actions/password-reset-token/get-password-reset-token-by-email"

export default async function createPasswordResetToken(email: string): Promise<ServerResponse> {
    const token = randomUUID()
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000)
    const expires = new Date(new Date().getTime() + 3600 * 1000) // expires in 1 hour

    try {
        // if a token exists for the email, delete it so we can create a new one
        const tokenResponse = await getPasswordResetTokenByEmail(email)
        if ("token" in tokenResponse) {
            if (tokenResponse.token.id) await deletePasswordResetTokenById(tokenResponse.token.id)
        }

        const passwordResetToken = await prisma.passwordResetToken.create({
            data: {
                email,
                expires,
                sixDigitCode,
                token,
            },
        })
        if (!passwordResetToken) return { error: `Error Creating Password Reset Token For Email ${email}`, status: 500 }

        return {
            status: 200,
            success: `Successfully Created Password Reset Token For Email: ${email}`,
            token: passwordResetToken,
        }
    } catch (error) {
        console.error(`Error Creating Password Reset Token For Email: ${email}: ${error}`)
        return { error: `Error Creating Password Reset Token For Email: ${email}`, status: 500 }
    }
}
