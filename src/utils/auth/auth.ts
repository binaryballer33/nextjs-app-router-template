import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import callbacks from "src/utils/auth/callbacks"
import logger from "src/utils/auth/logger"
import providers from "src/utils/auth/providers"

import prisma from "../database/prisma"

// import pages from "src/utils/auth/pages"

export const { handlers, auth, signIn, signOut } = NextAuth({
    // pages,
    logger,
    providers,
    callbacks,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // modify the session's maxAge, strategy, etc
    debug: process.env.NODE_ENV === "development",
})
