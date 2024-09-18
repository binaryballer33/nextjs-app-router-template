"use client"

import type { SubmitHandler } from "react-hook-form"
import type { RegisterRequest } from "src/types/forms/register"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesRegisterRequest, RegisterRequestSchema } from "src/types/forms/register"

import { useCallback } from "react"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { Container } from "@mui/material"

import handleAuthResponse from "src/utils/helper-functions/handleServerResponse"

import register from "src/actions/auth/register"

import FlexBox from "src/components/base/flex-box/flex-box"
import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"
import Form from "src/components/react-hook-form/form-provider"
import FormDivider from "src/components/react-hook-form/form/form-divider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormLink from "src/components/react-hook-form/form/form-link"
import OAuthButton from "src/components/react-hook-form/form/form-oauth-button"
import ClearFormButton from "src/components/react-hook-form/form/form-reset-button"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

/*
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  TODO: figure out why isSubmitting doesn't work for me
  it doesn't affect the functionality of the app
  You can duplicate the error by toggling the password visibility icon in the register or login form
*/
export default function RegisterView() {
    const { t } = useTranslation()

    const methods = useForm<RegisterRequest>({
        defaultValues: defaultValuesRegisterRequest,
        resolver: zodResolver(RegisterRequestSchema),
    })

    const { handleSubmit: rhfHandleSubmit, reset: resetForm } = methods

    const handleSubmit: SubmitHandler<RegisterRequest> = useCallback(
        async (credentials: RegisterRequest): Promise<void> => {
            resetForm() // Reset the form to clear the inputs
            const response = await register(credentials)
            handleAuthResponse({ redirectTo: routes.auth.login, response, toast })
        },
        [resetForm],
    )

    return (
        <Form methods={methods} onSubmit={rhfHandleSubmit(handleSubmit)}>
            <FullScreenCenteredContainer>
                <FormHead
                    description={t("Join Our Platform By Creating A New Account For Exclusive Access")}
                    icon={<AccountCircleIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                    title={t("Create A New Account")}
                />

                <Container maxWidth="sm">
                    <FlexBox gap={2} stackOnMobile>
                        <OAuthButton provider={oAuthProviders.google} t={t} />
                        <OAuthButton provider={oAuthProviders.facebook} t={t} />
                    </FlexBox>
                </Container>

                <FormDivider title="Or Register With Email Below" />

                <Container maxWidth="sm">
                    <FlexBox gap={2} stackOnMobile>
                        <AuthFormInput inputName="firstName" label="First Name" />
                        <AuthFormInput inputName="lastName" label="Last Name" />
                    </FlexBox>

                    <AuthFormInput inputName="email" label="Email" />
                    <AuthFormInput inputName="password" label="Password" showVisibilityButtons />
                    <AuthFormInput inputName="confirmPassword" label="Confirm Password" showVisibilityButtons />

                    <ClearFormButton title={t("Clear Form")} />
                    <FormSubmitButton loadingIndicator={t("Creating Account...")} title={t("Create Account")} />
                    <FormLink linkTitle={t("Sign In Here")} linkTo={routes.auth.login} title={t("Already A Member?")} />
                </Container>
            </FullScreenCenteredContainer>
        </Form>
    )
}
