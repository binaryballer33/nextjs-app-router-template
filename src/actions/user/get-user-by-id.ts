import type { ServerResponse } from "src/types/auth/server-response"

import VerifyUUIDSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

export default async function getUserById(userId: string): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

        const user = await prisma.user.findUnique({
            where: {
                id: validatedUserId,
            },
        })

        if (!user) return { error: `Error Retrieving User With Id: ${validatedUserId}`, status: 400 }
        return { status: 200, success: `Successfully Retrieved User With Id: ${validatedUserId}`, user }
    } catch (error) {
        console.error(`Error Retrieving User With Id ${userId}: ${error}`)
        return { error: "Error Retrieving User With Id", status: 400 }
    }
}
