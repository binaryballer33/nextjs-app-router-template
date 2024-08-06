/*
  CLIENT COMPONENT function to check if user is logged in,
  redirect to login page if not and if logged in already, return user data and supabase client
*/
import { redirect } from "next/navigation"

import createBrowserClient from "../supabase/client"

export default async function checkLoginStatusClient() {
    const supabaseBrowserClient = createBrowserClient()
    const { data, error } = await supabaseBrowserClient.auth.getSession()

    if (error || !data?.session?.user) redirect("/login")

    return { data, supabaseBrowserClient }
}
