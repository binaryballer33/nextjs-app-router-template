"use server"

/* eslint-disable no-console */
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { LoginRequest, LoginRequestSchema } from "src/models/forms/login"
import createServerClient from "src/utils/supabase/server"

export default async function login(credentials: LoginRequest) {
  const validatedLoginRequest = LoginRequestSchema.safeParse(credentials)

  if (!validatedLoginRequest.success) {
    console.debug("Invalid Login Request", validatedLoginRequest.error.message)
    throw new Error("Invalid Login Request")
  }

  const { email, password } = validatedLoginRequest.data

  const supabase = createServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.debug("Error signing in", error.message)
    throw new Error("Error signing in")
  }

  revalidatePath("/")
  redirect("/profile")
}
