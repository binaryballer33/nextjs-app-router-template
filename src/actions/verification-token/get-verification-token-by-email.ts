"use server"

import prisma from "src/utils/database/prisma"

export default async function getVerificationTokenByEmail(email: string) {
    try {
        const token = await prisma.verificationToken.findFirst({
            where: {
                email,
            },
        })

        if (!token) return null
        return token
    } catch (error) {
        console.error(`Error Getting Verification Token For Email ${email}: ${error}`)
        throw error
    }
}
