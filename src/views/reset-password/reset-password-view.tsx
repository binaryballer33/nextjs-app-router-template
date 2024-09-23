"use client"

import type { ResetPassword } from "src/types/forms/reset-password"

import { defaultValuesResetPassword, ResetPasswordSchema } from "src/types/forms/reset-password"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import LockResetIcon from "@mui/icons-material/LockReset"

import { Container } from "@mui/material"

import handleAuthResponse from "src/utils/helper-functions/handleServerResponse"

import resetUserPassword from "src/actions/auth/reset-user-password"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

export default function ResetPasswordView() {
    const { t } = useTranslation()

    const methods = useForm<ResetPassword>({
        defaultValues: defaultValuesResetPassword,
        resolver: zodResolver(ResetPasswordSchema),
    })

    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async (data) => {
        const response = await resetUserPassword("mockedEmail")
        await handleAuthResponse({ response, toast })
    })

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <Container maxWidth="sm">
                <Form methods={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter New Password Below`)}
                        icon={<LockResetIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Reset Your Password")}
                    />
                    <AuthFormInput inputName="password" label={t("New Password")} showVisibilityButtons />
                    <AuthFormInput
                        inputName="confirmPassword"
                        label={t("Confirm New Password")}
                        showVisibilityButtons
                    />
                    <FormSubmitButton loadingTitle={t("Resetting Password...")} title={t("Reset Password")} />
                </Form>
                <FormReturnLink href={routes.auth.forgotPassword} title={t("Return To Forgot Password")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
