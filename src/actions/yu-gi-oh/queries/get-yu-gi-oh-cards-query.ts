"use server"

import prisma from "@/lib/database/prisma"

export default async function getYuGiOhCardsQuery(page = 0, limit = 50) {
    const skipPreviousRecords = page * limit

    try {
        return await prisma.yugiohCard.findMany({
            orderBy: {
                name: "desc",
            },
            skip: skipPreviousRecords,
            take: limit,
        })
    } catch (error) {
        console.error(`Error Fetching Yu-Gi-Oh Cards: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
