import type { ServerResponse } from "@/types/auth/server-response"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/ils/database/prisma" // TODO: figure out where you are using linkAccount event and if this function is necessary

export default async function updateUserEmailVerification(userId: string): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

        const user = await prisma.user.update({
            data: {
                emailVerified: new Date(),
            },
            where: {
                id: validatedUserId,
            },
        })

        if (!user) return { error: `Error Updating User Email Verification`, status: 400 }
        return { status: 200, success: `Successfully Updated User Email Verification`, user }
    } catch (error) {
        console.error(`Error Updating User Email Verification: ${error}`)
        return { error: "Error Updating User Email Verification", status: 400 }
    }
}
