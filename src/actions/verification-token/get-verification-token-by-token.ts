"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import prisma from "src/utils/database/prisma"

export default async function getVerificationTokenByToken(token: string): Promise<ServerResponse> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token,
            },
        })

        if (!verificationToken) return { error: "Error Getting Verification Token", status: 400 }
        return { status: 200, success: "Successfully Retrieved Verification Token", token: verificationToken }
    } catch (error) {
        console.error(`Error Getting Verification Token With Token ${token}: ${error}`)
        return { error: "Error Getting Verification Token", status: 400 }
    }
}
