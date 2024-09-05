"use server"

import prisma from "src/utils/database/prisma"

export default async function getVerificationTokenByToken(token: string) {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token,
            },
        })

        if (!verificationToken) return null
        return verificationToken
    } catch (error) {
        console.error(`Error Getting Verification Token With Token ${token}: ${error}`)
        return null
    }
}
