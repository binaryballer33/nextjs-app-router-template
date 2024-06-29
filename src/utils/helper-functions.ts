import { redirect } from 'next/navigation'
import { createClient as createBrowserClient } from './supabase/client'
import { createClient as createServerClient } from './supabase/server'

/*
  SERVER COMPONENT function to check if user is logged in,
  redirect to login page if not and if logged in already, return user data and supabase client
*/
export async function checkLoginStatusServer() {
  const supabaseServerClient = createServerClient()
  const { data, error } = await supabaseServerClient.auth.getUser()

  if (error || !data?.user) redirect('/login')

  return { data, supabaseServerClient }
}

/*
  CLIENT COMPONENT function to check if user is logged in,
  redirect to login page if not and if logged in already, return user data and supabase client
*/
export async function checkLoginStatusClient() {
  const supabaseBrowserClient = createBrowserClient()
  const { data, error } = await supabaseBrowserClient.auth.getSession()

  if (error || !data?.session?.user) redirect('/login')

  return { data, supabaseBrowserClient }
}
