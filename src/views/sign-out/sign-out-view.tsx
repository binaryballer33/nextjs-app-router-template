"use client"

import { useTranslation } from "react-i18next"

import { Typography } from "@mui/material"

import useRedirectIfStale from "src/hooks/use-redirect-if-stale"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import FormLink from "src/components/react-hook-form/form/form-link"

import routes from "src/routes/routes"

function SignOutView() {
    const { t } = useTranslation()
    useRedirectIfStale(routes.auth.login, 2000) // redirect if stale on page

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <Typography variant="body1">{t("You've Been Successfully Signed Out")}</Typography>
            <FormLink linkTitle={t("Go Back To The Home Page")} linkTo={routes.index} />
        </FlexCenteredFullScreenContainer>
    )
}

export default SignOutView
