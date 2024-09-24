"use client"

import type { LoginRequest } from "src/types/forms/login"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesLoginRequest as defaultValues, LoginRequestSchema } from "src/types/forms/login"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import LoginIcon from "@mui/icons-material/Login"

import { Container } from "@mui/material"

import handleServerResponse from "src/utils/helper-functions/handleServerResponse"

import login from "src/actions/auth/login"

import FlexBetweenContainer from "src/components/base/flex-box/flex-between-container"
import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import FlexContainer from "src/components/base/flex-box/flex-container"
import Form from "src/components/react-hook-form/form-provider"
import FormDivider from "src/components/react-hook-form/form/form-divider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormLink from "src/components/react-hook-form/form/form-link"
import OAuthButton from "src/components/react-hook-form/form/form-oauth-button"
import ClearFormButton from "src/components/react-hook-form/form/form-reset-button"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes" /*
  TODO: maybe I need this, maybe I don't import { useSession } from "next-auth/react"
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  it doesn't affect the functionality of the app

  You can duplicate the error by toggling the password visibility icon in the register or login form
  TODO: figure out why isSubmitting doesn't work for me in rhf fields
*/

export default function LoginView() {
    const { t } = useTranslation()

    const methods = useForm<LoginRequest>({ defaultValues, resolver: zodResolver(LoginRequestSchema) })
    const { handleSubmit, reset: resetForm } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await login(formData)
        // causes loading button to not display the loading indicator if called before the response is received
        resetForm()
        await handleServerResponse({ redirectTo: routes.user.profile, response, toast })
    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <FlexCenteredFullScreenContainer minHeight="80dvh">
                <FormHead
                    description="Login To Your Account For Full Access"
                    icon={<LoginIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                    title="Sign In"
                />

                <Container maxWidth="sm">
                    <FlexContainer stackOnMobile>
                        <OAuthButton provider={oAuthProviders.google} t={t} />
                        <OAuthButton provider={oAuthProviders.facebook} t={t} />
                    </FlexContainer>
                </Container>

                <FormDivider title={t("Or Sign In With Email Below")} />

                <Container maxWidth="sm">
                    <AuthFormInput inputName="email" label="Email" />
                    <AuthFormInput inputName="password" label="Password" showVisibilityButtons />

                    <FlexBetweenContainer>
                        <FormLink linkTitle={t("Forgot Password?")} linkTo={routes.auth.forgotPassword} />
                        <ClearFormButton title={t("Clear Form")} />
                    </FlexBetweenContainer>
                    <FormSubmitButton loadingTitle={t("Signing In...")} title={t("Sign In")} />
                    <FormLink linkTitle={t("Sign Up")} linkTo={routes.auth.register} title={t("Not A Member Yet?")} />
                </Container>
            </FlexCenteredFullScreenContainer>
        </Form>
    )
}
