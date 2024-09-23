import type { ServerResponse } from "src/types/auth/server-response"

import prisma from "src/utils/database/prisma"

export default async function getUserByEmail(email: string): Promise<ServerResponse> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) return { error: `Error Getting User With Email: ${email}`, status: 400 }

        return { status: 200, success: `Successfully Retrieved User With Email: ${email}`, user }
    } catch (error) {
        console.error(`Error Getting User With Email ${email}: ${error}`)
        return { error: `Error Getting User With Email: ${email}`, status: 400 }
    }
}
