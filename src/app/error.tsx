"use client"

import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import FullScreenCenteredContainer from "src/components/base/full-height-width-centered-container"

function Page() {
  const router = useRouter()

  return (
    <FullScreenCenteredContainer>
      <Typography>Sorry, something went wrong</Typography>
      <Button variant="contained" onClick={() => router.push("/")}>
        Go back to the home page
      </Button>
      <Button variant="contained" onClick={() => router.back()}>
        Go back to the previous page
      </Button>
    </FullScreenCenteredContainer>
  )
}

export default Page
