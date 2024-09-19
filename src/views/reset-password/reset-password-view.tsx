"use client"

import type { ResetPassword } from "src/types/forms/reset-password"

import { defaultValuesResetPassword, ResetPasswordSchema } from "src/types/forms/reset-password"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import LockIcon from "@mui/icons-material/Lock"

import { Container } from "@mui/material"

import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"
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
        try {
            // const response = await sendVerificationEmail()
        } catch (error) {
            toast.error(`Error Sending Password Reset Email`)
            console.error(`Error Sending Password Reset Email: ${error}`)
        }
    })

    return (
        <FullScreenCenteredContainer minHeight="75dvh">
            <Container maxWidth="sm">
                <Form methods={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter The Email Address Associated With Your Account`)}
                        icon={<LockIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Forgot Your Password?")}
                    />
                    <AuthFormInput inputName="email" label={t("Email Address")} />
                    <FormSubmitButton loadingIndicator={t("Sending...")} title={t("Send Request")} />
                </Form>
                <FormReturnLink href={routes.auth.login} title={t("Return To Sign In")} />
            </Container>
        </FullScreenCenteredContainer>
    )
}
