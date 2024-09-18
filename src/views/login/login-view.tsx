"use client"

import type { SubmitHandler } from "react-hook-form"
import type { LoginRequest } from "src/types/forms/login"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesLoginRequest, LoginRequestSchema } from "src/types/forms/login"

import { useCallback } from "react"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import { Container } from "@mui/material"

import handleAuthResponse from "src/utils/helper-functions/handleServerResponse"

import login from "src/actions/auth/login"

import FlexBetween from "src/components/base/flex-box/flex-between"
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

import routes from "src/routes/routes" /*
  TODO: maybe I need this, maybe I don't import { useSession } from "next-auth/react"
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  it doesn't affect the functionality of the app

  You can duplicate the error by toggling the password visibility icon in the register or login form
  TODO: figure out why isSubmitting doesn't work for me in rhf fields
*/

export default function LoginView() {
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const { t } = useTranslation()

    const methods = useForm<LoginRequest>({
        defaultValues: defaultValuesLoginRequest,
        resolver: zodResolver(LoginRequestSchema),
    })

    const { handleSubmit: handleSubmitHookForm, reset: resetFormFields } = methods

    const handleSubmit: SubmitHandler<LoginRequest> = useCallback(
        async (credentials: LoginRequest): Promise<void> => {
            // setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
            resetFormFields() // Reset the form to clear the inputs

            const response = await login(credentials) // Call the login action to sign in the user with next auth
            // setIsLoading(false)

            handleAuthResponse({ redirectTo: routes.user.profile, response, toast })
        },
        [resetFormFields],
    )

    return (
        <Form methods={methods} onSubmit={handleSubmitHookForm(handleSubmit)}>
            <FullScreenCenteredContainer minHeight="80dvh">
                <FormHead description="Access Your Account And Continue Your Journey" title="Sign In" />

                <Container maxWidth="sm">
                    <FlexBox gap={2} stackOnMobile>
                        <OAuthButton provider={oAuthProviders.google} t={t} />
                        <OAuthButton provider={oAuthProviders.facebook} t={t} />
                    </FlexBox>
                </Container>

                <FormDivider title={t("Or Sign In With Email Below")} />

                <Container maxWidth="sm">
                    <AuthFormInput inputName="email" label="Email" />
                    <AuthFormInput inputName="password" label="Password" showVisibilityButtons />

                    <FlexBetween>
                        <FormLink linkTitle={t("Forgot Password?")} linkTo={routes.resetPassword} />
                        <ClearFormButton title={t("Clear Form")} />
                    </FlexBetween>
                    <FormSubmitButton loadingIndicator={t("Signing In...")} title={t("Sign In")} />
                    <FormLink linkTitle={t("Sign Up")} linkTo={routes.auth.register} title={t("Not A Member Yet?")} />
                </Container>
            </FullScreenCenteredContainer>
        </Form>
    )
}
