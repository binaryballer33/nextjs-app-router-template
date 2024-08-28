"use server"

import { revalidatePath } from "next/cache"

import type { RegisterRequest } from "src/models/forms/register"
import { RegisterRequestSchema } from "src/models/forms/register"
import createServerClient from "src/utils/supabase/server"

export default async function register(credentials: RegisterRequest) {
    const validatedRegisterRequest = RegisterRequestSchema.safeParse(credentials)

    if (!validatedRegisterRequest.success) {
        console.debug("Invalid Register Request", validatedRegisterRequest.error.message)
        throw new Error("Invalid Register Request")
    }

    const { email, password } = validatedRegisterRequest.data

    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: "/",
        },
    })

    if (error) console.debug("Error signing up", error.message)

    revalidatePath("/")
    return { data, error }
}
