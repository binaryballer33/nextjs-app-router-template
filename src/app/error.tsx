'use client'

import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function ErrorPage() {
  const router = useRouter()
  return (
    <Box display={'flex'} gap={2}>
      <Typography>Sorry, something went wrong</Typography>
      <Button variant="contained" onClick={() => router.push('/')}>
        Go back to the home page
      </Button>
      <Button variant="contained" onClick={() => router.back()}>
        Go back to the previous page
      </Button>
    </Box>
  )
}
