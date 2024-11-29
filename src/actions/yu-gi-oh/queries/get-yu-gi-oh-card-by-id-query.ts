"use server"

import prisma from "@/lib/utils/database/prisma"

export default async function getYuGiOhCardByIdQuery(id: number) {
    try {
        return await prisma.yugiohCard.findUnique({
            where: {
                id,
            },
        })
    } catch (error) {
        console.error(`Error Fetching Yu-Gi-Oh Card With Id ${id}: ${error}`)
        return null
    } finally {
        prisma.$disconnect()
    }
}
