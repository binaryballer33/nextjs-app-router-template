"use server"

import { revalidatePath } from "next/cache"

import type { LoginRequest } from "src/models/forms/login"
import { LoginRequestSchema } from "src/models/forms/login"
import { signIn } from "src/utils/auth/auth"

export default async function login(credentials: LoginRequest) {
    const validatedLoginRequest = LoginRequestSchema.safeParse(credentials)

    if (!validatedLoginRequest.success) {
        console.debug("Invalid Login Request", validatedLoginRequest.error.message)
        throw new Error("Invalid Login Request")
    }

    const { email, password } = validatedLoginRequest.data

    await signIn("credentials", { email, password, redirectTo: "/user/profile" })

    revalidatePath("/")
}
