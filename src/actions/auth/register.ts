"use server"

/* eslint-disable no-console */
import { revalidatePath } from "next/cache"
import { RegisterForm } from "src/models/forms/register"
import createServerClient from "src/utils/supabase/server"

export default async function register(credentials: RegisterForm) {
  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: "/",
    },
  })

  if (error) console.debug("Error signing up", error.message)

  revalidatePath("/")
  return { data, error }
}
