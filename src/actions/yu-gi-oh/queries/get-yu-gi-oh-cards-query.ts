"use server"

import prisma from "src/utils/database/prisma"

// @ts-ignore
export default async function getYuGiOhCardsQuery(page = 0, limit = 50) {
    const skipPreviousRecords = page * limit

    try {
        return prisma.yugiohCard.findMany({
            take: limit,
            orderBy: {
                name: "desc",
            },
            skip: skipPreviousRecords,
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error Fetching Yu-Gi-Oh Cards", error)
        return []
    } finally {
        prisma.$disconnect()
    }
}
