"use client"

import { useRouter } from "next/navigation"

import { Button, Typography } from "@mui/material"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"

function Page() {
    const router = useRouter()

    return (
        <FlexCenteredFullScreenContainer>
            <Typography>Sorry, something went wrong</Typography>
            <Button onClick={() => router.push("/")} variant="contained">
                Go back to the home page
            </Button>
            <Button onClick={() => router.back()} variant="contained">
                Go back to the previous page
            </Button>
        </FlexCenteredFullScreenContainer>
    )
}

export default Page
