"use server"

/* eslint-disable no-console */
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { LoginForm } from "src/models/forms/login"
import createServerClient from "src/utils/supabase/server"

export default async function login(credentials: LoginForm) {
  const { email, password } = credentials
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
