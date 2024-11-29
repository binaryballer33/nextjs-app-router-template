import type { AdapterUser } from "@auth/core/adapters"
import type { NextAuthConfig } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "@/lib/utils/database/prisma"

/*
 * Just customizing the createUser method of the prisma adapter because I want to tweak how the user gets created.
 * Also putting the code here, allows me to remove this logic from the sign in callback
 */
const prismaAdapter = PrismaAdapter(prisma)

const adapter: NextAuthConfig["adapter"] = {
    ...prismaAdapter,

    /*
     * After oauth provider authorizes user and the sign in callback returns true,
     * the user will be created in the database using the prisma adapter
     * if I want to make any changes to the user object before it is created, here is the last chance
     */
    async createUser(user: AdapterUser) {
        try {
            // TODO: figure out how to create user without image, prisma will throw an error without it
            // this field isn't in my user model and prisma will throw an error, it comes from the oauth provider
            // delete user.image
            return await prismaAdapter.createUser!(user)
        } catch (error) {
            console.error(`Error While Creating User: ${error}`)
            throw new Error(`Error While Creating User: ${error}`)
        }
    },
}

export default adapter
