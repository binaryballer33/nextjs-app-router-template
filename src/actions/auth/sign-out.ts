"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import createServerClient from "src/utils/supabase/server"

export default async function signOut() {
    const supabase = createServerClient()

    const { error } = await supabase.auth.signOut()

    if (error) console.debug("Error signing out", error)

    revalidatePath("/")
    redirect("/sign-out")
}
