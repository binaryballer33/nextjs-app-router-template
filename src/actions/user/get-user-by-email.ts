import prisma from "src/utils/database/prisma"

export default async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) return null
        return user
    } catch (error) {
        console.error(`Error Getting User With Email ${email}: ${error}`)
        return null
    }
}
