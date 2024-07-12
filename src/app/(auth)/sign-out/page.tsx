"use client"

import { useRouter } from "next/navigation"

import { Button, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import FullScreenCenteredContainer from "src/components/base/full-height-width-centered-container"

function SignOutPage() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <FullScreenCenteredContainer>
      <Typography variant="body1">{t("You've Been Successfully Signed Out")}</Typography>
      <Button variant="contained" onClick={() => router.push("/")}>
        {t("Go back to the home page")}
      </Button>
    </FullScreenCenteredContainer>
  )
}

export default SignOutPage
