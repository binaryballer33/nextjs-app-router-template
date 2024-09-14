"use client"

import { useRouter } from "next/navigation"

import { useTranslation } from "react-i18next"

import { Button, Typography } from "@mui/material"

import FullScreenCenteredContainer from "src/components/base/full-height-width-centered-container"

function SignOutView() {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <FullScreenCenteredContainer minHeight="75dvh">
            <Typography variant="body1">{t("You've Been Successfully Signed Out")}</Typography>
            <Button onClick={() => router.push("/")} variant="contained">
                {t("Go Back To The Home Page")}
            </Button>
        </FullScreenCenteredContainer>
    )
}

export default SignOutView
