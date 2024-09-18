"use client"

import { useRouter } from "next/navigation"

import { Button, Typography } from "@mui/material"

import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"

function Page() {
    const router = useRouter()

    return (
        <FullScreenCenteredContainer>
            <Typography>Sorry, something went wrong</Typography>
            <Button onClick={() => router.push("/")} variant="contained">
                Go back to the home page
            </Button>
            <Button onClick={() => router.back()} variant="contained">
                Go back to the previous page
            </Button>
        </FullScreenCenteredContainer>
    )
}

export default Page
