import type { TFunction } from "i18next"

import oAuthProviders from "src/types/forms/common"

import LoginIcon from "@mui/icons-material/Login"

import { Container } from "@mui/material"

import FlexBetweenContainer from "src/components/base/flex-box/flex-between-container"
import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import FlexContainer from "src/components/base/flex-box/flex-container"
import FormDivider from "src/components/react-hook-form/form/form-divider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormLink from "src/components/react-hook-form/form/form-link"
import OAuthButton from "src/components/react-hook-form/form/form-oauth-button"
import ClearFormButton from "src/components/react-hook-form/form/form-reset-button"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

type LoginFormProps = {
    t: TFunction<"translation", undefined>
}

export default function LoginForm(props: LoginFormProps) {
    const { t } = props

    return (
        <FlexCenteredFullScreenContainer minHeight="80dvh">
            <FormHead
                description="Login To Your Account For Full Access"
                icon={<LoginIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                title="Sign In"
            />

            <Container maxWidth="sm">
                <FlexContainer stackOn="mobile">
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
    )
}
