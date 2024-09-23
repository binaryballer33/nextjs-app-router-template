import type { ServerResponse } from "src/types/auth/server-response"

import prisma from "src/utils/database/prisma"

export default async function getUserById(id: string): Promise<ServerResponse> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })

        if (!user) return { error: `Error Retrieving User With Id: ${id}`, status: 400 }
        return { status: 200, success: `Successfully Retrieved User With Id: ${id}`, user }
    } catch (error) {
        console.error(`Error Retrieving User With Id ${id}: ${error}`)
        return { error: "Error Retrieving User With Id", status: 400 }
    }
}
