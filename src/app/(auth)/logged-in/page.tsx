import { createClient } from '@/utils/supabase/server'
import { Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import FullScreenCenteredContainer from 'src/components/base/full-height-width-centered-container'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const lastSignIn = dateFormatter.format(new Date(data.user.last_sign_in_at!))
  const accountCreationDate = dateFormatter.format(new Date(data.user.confirmed_at!))

  return (
    <FullScreenCenteredContainer>
      <Typography variant="h4" color={'primary'}>
        Hello {data.user.email}
      </Typography>
      <Typography variant="h4" color={'primary'}>
        Last Sign In: {lastSignIn}
      </Typography>
      <Typography variant="h4" color={'primary'}>
        Account Created: {accountCreationDate}
      </Typography>
    </FullScreenCenteredContainer>
  )
}
