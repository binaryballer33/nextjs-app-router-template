"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import prisma from "src/utils/database/prisma"

export default async function getVerificationTokenByEmail(email: string): Promise<ServerResponse> {
    try {
        const token = await prisma.verificationToken.findFirst({
            where: {
                email,
            },
        })

        if (!token) return { error: `Error Getting Verification Token For Email: ${email}`, status: 500 }
        return { status: 200, success: `Successfully Retrieved Verification Token For Email: ${email}`, token }
    } catch (error) {
        console.error(`Error Getting Verification Token For Email ${email}: ${error}`)
        return { error: `Error Getting Verification Token For Email: ${email}`, status: 500 }
    }
}
