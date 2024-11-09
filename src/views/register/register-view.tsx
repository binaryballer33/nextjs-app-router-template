"use client"

import type { RegisterRequest } from "src/types/forms/register"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesRegisterRequest as defaultValues, RegisterRequestSchema } from "src/types/forms/register"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { Container } from "@mui/material"

import handleServerResponse from "src/utils/helper-functions/handleServerResponse"

import register from "src/actions/auth/register"

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

import routes from "src/routes/routes"

/*
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  it doesn't affect the functionality of the app
  You can duplicate the error by toggling the password visibility icon in the register or login form
*/
export default function RegisterView() {
    const { t } = useTranslation()

    const methods = useForm<RegisterRequest>({ defaultValues, resolver: zodResolver(RegisterRequestSchema) })
    const { handleSubmit, reset: resetForm } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await register(formData)
        // causes loading button to not display the loading indicator if called before the response is received
        resetForm()
        await handleServerResponse({ delay: 3500, redirectTo: routes.auth.login, response, toast })
    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <FlexCenteredFullScreenContainer>
                <Container maxWidth="sm">
                    <FormHead
                        description={t("Join Our Platform By Creating A New Account For Exclusive Access")}
                        icon={<AccountCircleIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Create A New Account")}
                    />
                    <FlexContainer stackOn="mobile">
                        <OAuthButton provider={oAuthProviders.google} t={t} />
                        <OAuthButton provider={oAuthProviders.facebook} t={t} />
                    </FlexContainer>
                </Container>

                <FormDivider title="Or Register With Email Below" />

                <Container maxWidth="sm">
                    <FlexContainer stackOn="mobile">
                        <AuthFormInput inputName="firstName" label="First Name" />
                        <AuthFormInput inputName="lastName" label="Last Name" />
                    </FlexContainer>

                    <AuthFormInput inputName="email" label="Email" />
                    <AuthFormInput inputName="password" label="Password" showVisibilityButtons />
                    <AuthFormInput inputName="confirmPassword" label="Confirm Password" showVisibilityButtons />

                    <FlexBetweenContainer stackOn="mobile">
                        <FormLink
                            linkTitle={t("Sign In Here")}
                            linkTo={routes.auth.login}
                            title={t("Already A Member?")}
                        />
                        <ClearFormButton title={t("Clear Form")} />
                    </FlexBetweenContainer>
                    <FormSubmitButton loadingTitle={t("Creating Account...")} title={t("Create Account")} />
                </Container>
            </FlexCenteredFullScreenContainer>
        </Form>
    )
}
