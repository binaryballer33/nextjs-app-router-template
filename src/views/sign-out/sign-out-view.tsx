"use client"

import { useTranslation } from "react-i18next"

import { Typography } from "@mui/material"

import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"
import FormLink from "src/components/react-hook-form/form/form-link"

import routes from "src/routes/routes"

function SignOutView() {
    const { t } = useTranslation()

    return (
        <FullScreenCenteredContainer minHeight="75dvh">
            <Typography variant="body1">{t("You've Been Successfully Signed Out")}</Typography>
            <FormLink linkTitle={t("Go Back To The Home Page")} linkTo={routes.index} />
        </FullScreenCenteredContainer>
    )
}

export default SignOutView
