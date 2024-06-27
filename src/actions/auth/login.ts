'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LoginForm } from 'src/models/forms/login'

export async function login(credentials: LoginForm) {
  const { email, password } = credentials
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.debug('Error signing in', error.message)
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/logged-in')
}
