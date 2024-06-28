'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { RegisterForm } from 'src/models/forms/register'
import { createClient } from 'src/utils/supabase/server'

export async function register(credentials: RegisterForm) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: '/',
    },
  })

  if (error) {
    console.debug('Error signing up', error.message)
  }

  revalidatePath('/')
  redirect('/')
  return { data, error }
}
