"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import VerifyIdSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

export default async function deletePasswordResetTokenById(id: string): Promise<ServerResponse> {
    try {
        const { id: validatedId } = VerifyIdSchema.parse({ id })

        const tokenResponse = await prisma.passwordResetToken.delete({
            where: {
                id: validatedId,
            },
        })
        if (!tokenResponse) return { error: "Error Deleting Password Reset Token After Password Reset", status: 500 }

        return { status: 200, success: `Successfully Deleted Password Reset Token`, token: tokenResponse }
    } catch (error) {
        console.error(`Error Deleting Password Reset Token With Id ${id}: ${error}`)
        return { error: "Error Deleting Password Reset Token After Password Reset", status: 500 }
    }
}
