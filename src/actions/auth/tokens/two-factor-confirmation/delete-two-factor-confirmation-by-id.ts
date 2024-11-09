"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import VerifyIdSchema from "src/types/forms/verify-id"

import prisma from "src/utils/database/prisma"

export default async function deleteTwoFactorConfirmationById(id: string): Promise<ServerResponse> {
    try {
        const { id: validatedId } = VerifyIdSchema.parse({ id })

        const twoFactorConfirmation = await prisma.twoFactorConfirmation.delete({
            where: {
                id: validatedId,
            },
        })
        if (!twoFactorConfirmation) return { error: "Error Deleting Two Factor Confirmation", status: 500 }

        return {
            confirmation: twoFactorConfirmation,
            status: 200,
            success: `Successfully Deleted Two Factor Confirmation`,
        }
    } catch (error) {
        console.error(`Error Deleting Two Factor Confirmation With Id ${id}: ${error}`)
        return { error: "Error Deleting Two Factor Confirmation", status: 500 }
    }
}
