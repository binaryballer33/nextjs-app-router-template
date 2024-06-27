'use client'

import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import FullScreenCenteredContainer from 'src/components/base/full-height-width-centered-container'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <FullScreenCenteredContainer>
      <Typography>Sorry, something went wrong</Typography>
      <Button variant="contained" onClick={() => router.push('/')}>
        Go back to the home page
      </Button>
      <Button variant="contained" onClick={() => router.back()}>
        Go back to the previous page
      </Button>
    </FullScreenCenteredContainer>
  )
}
