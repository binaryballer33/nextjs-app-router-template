'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LoginForm } from 'src/models/forms/login'
import { createClient } from 'src/utils/supabase/server'

export async function login(credentials: LoginForm) {
  const { email, password } = credentials
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.debug('Error signing in', error.message)
    throw new Error('Error signing in')
  }

  revalidatePath('/')
  redirect('/profile')
}
