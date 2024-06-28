'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from 'src/utils/supabase/server'

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.debug('Error signing out', error)
    // redirect('/error')
  }

  revalidatePath('/')
  redirect('/sign-out')
}
