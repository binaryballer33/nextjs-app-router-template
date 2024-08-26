"use server"

import prisma from "src/utils/database/prisma"

export default async function getYuGiOhCardByIdQuery(id: number) {
    try {
        return prisma.yugiohCard.findUnique({
            where: {
                id,
            },
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error Fetching Yu-Gi-Oh Card", error)
        return {}
    } finally {
        prisma.$disconnect()
    }
}
