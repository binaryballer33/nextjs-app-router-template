import { Stack, Typography } from '@mui/material'
import { checkLoginStatusServer } from 'src/utils/helper-functions'
import UserProfile from './page-components/user-profile'

export default async function PrivatePage() {
  const { data, supabaseServerClient } = await checkLoginStatusServer()

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const lastSignIn = dateFormatter.format(new Date(data.user.last_sign_in_at!))
  const accountCreationDate = dateFormatter.format(new Date(data.user.confirmed_at!))

  return (
    <UserProfile />
    // <Stack gap={2} minWidth={1}>
    //   <Typography variant="h5" color={'primary'}>
    //     Last Sign In: {lastSignIn}
    //   </Typography>
    //   <Typography variant="h5" color={'primary'}>
    //     Account Created: {accountCreationDate}
    //   </Typography>
    // </Stack>
  )
}
