"use client"

import type { ResetPassword } from "src/types/forms/reset-password"

import { defaultValuesResetPassword as defaultValues, ResetPasswordSchema } from "src/types/forms/reset-password"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import LockResetIcon from "@mui/icons-material/LockReset"

import { Container, Stack } from "@mui/material"

import handleServerResponse from "src/utils/helper-functions/handleServerResponse"

import resetPassword from "src/actions/auth/reset-password"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

export default function ResetPasswordView() {
    const { t } = useTranslation()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const methods = useForm<ResetPassword>({ defaultValues, resolver: zodResolver(ResetPasswordSchema) })
    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await resetPassword({ ...formData, token: token! })
        await handleServerResponse({ closeTab: true, response, toast })
    })

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <Container maxWidth="sm">
                <Form methods={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter Your New Password Below\nFollowed By Your Six Digit Code`)}
                        icon={<LockResetIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Reset Your Password")}
                    />
                    <Stack gap={2}>
                        <AuthFormInput inputName="password" label={t("New Password")} showVisibilityButtons />
                        <AuthFormInput
                            inputName="confirmPassword"
                            label={t("Confirm New Password")}
                            showVisibilityButtons
                        />
                        <Field.Code name="sixDigitCode" />
                        <FormSubmitButton loadingTitle={t("Resetting Password...")} title={t("Reset Password")} />
                    </Stack>
                </Form>
                <FormReturnLink href={routes.auth.forgotPassword} title={t("Return To Forgot Password")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
