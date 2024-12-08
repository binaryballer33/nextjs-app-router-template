"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import prisma from "@/lib/database/prisma"
import VerifyIdSchema from "@/types/forms/verify-id"

export default async function getTwoFactorConfirmationByUserId(userId: string): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyIdSchema.parse({ id: userId })

        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where: { userId: validatedUserId },
        })

        if (!twoFactorConfirmation) return { error: "Error Getting Two Factor Confirmation", status: 400 }

        return {
            confirmation: twoFactorConfirmation!,
            status: 200,
            success: "Successfully Retrieved Two Factor Confirmation",
        }
    } catch (error) {
        console.error(`Error Getting Two Factor Confirmation With Id ${userId}: ${error}`)
        return { error: "Error Getting Two Factor Confirmation", status: 400 }
    }
}
