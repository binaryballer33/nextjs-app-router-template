'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = createClient()
  console.log('signing out')

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.debug('Error signing out', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
