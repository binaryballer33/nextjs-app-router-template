import prisma from "src/utils/database/prisma"

// TODO: figure out where you are using linkAccount event and if this function is necessary
export default async function updateUserEmailVerification(userId: string) {
    const user = await prisma.user.update({
        data: {
            emailVerified: new Date(),
        },
        where: {
            id: userId,
        },
    })

    if (!user) return null
    return user
}
