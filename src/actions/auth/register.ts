"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { hash } from "bcryptjs"

import type { RegisterRequest } from "src/models/forms/register"
import { RegisterRequestSchema } from "src/models/forms/register"
import prisma from "src/utils/database/prisma"

export default async function register(credentials: RegisterRequest) {
    const validatedRegisterRequest = RegisterRequestSchema.safeParse(credentials)

    if (!validatedRegisterRequest.success) {
        console.debug("Invalid Register Request", validatedRegisterRequest.error.message)
        throw new Error("Invalid Register Request")
    }

    // TODO: add terms and conditions later
    const { firstName, lastName, email, password } = validatedRegisterRequest.data
    const hashedPassword = await hash(password, 10)

    // TODO: clean up code and put db calls in right folder
    await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            encryptedPassword: hashedPassword,
        },
    })

    revalidatePath("/")
    redirect("/login")
}
