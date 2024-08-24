import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> =
    global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : ["error"],
    })

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma
