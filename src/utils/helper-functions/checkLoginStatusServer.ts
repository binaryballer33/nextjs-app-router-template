import { redirect } from "next/navigation"

import createServerClient from "../supabase/server"

/*
  SERVER COMPONENT function to check if user is logged in,
  redirect to login page if not and if logged in already, return user data and supabase client
*/
export default async function checkLoginStatusServer() {
    const supabaseServerClient = createServerClient()
    const { data, error } = await supabaseServerClient.auth.getUser()

    if (error || !data?.user) redirect("/login")

    return { data, supabaseServerClient }
}
