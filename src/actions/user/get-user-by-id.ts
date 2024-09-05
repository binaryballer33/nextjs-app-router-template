import prisma from "src/utils/database/prisma"

export default async function getUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    })

    if (!user) return null
    return user
}
