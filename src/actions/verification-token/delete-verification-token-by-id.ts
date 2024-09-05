"use server"

import prisma from "src/utils/database/prisma"

export default async function deleteVerificationTokenById(id: string) {
    try {
        const verificationToken = await prisma.verificationToken.delete({
            where: {
                id,
            },
        })

        if (!verificationToken) return null
        return verificationToken
    } catch (error) {
        console.error(`Error Deleting Verification Token With Id ${id}: ${error}`)
        throw error
    }
}
