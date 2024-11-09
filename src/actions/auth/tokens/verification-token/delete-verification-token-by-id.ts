"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import VerifyIdSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

export default async function deleteVerificationTokenById(id: string): Promise<ServerResponse> {
    try {
        const { id: validatedId } = VerifyIdSchema.parse({ id })

        const tokenResponse = await prisma.verificationToken.delete({
            where: {
                id: validatedId,
            },
        })
        if (!tokenResponse) return { error: "Error Deleting Verification Token After Verification", status: 500 }

        return { status: 200, success: `Successfully Deleted Verification Token`, token: tokenResponse }
    } catch (error) {
        console.error(`Error Deleting Verification Token With Id ${id}: ${error}`)
        return { error: "Error Deleting Verification Token After Verification", status: 500 }
    }
}
