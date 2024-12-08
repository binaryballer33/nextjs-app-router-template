"use client"

import type { ResetPassword } from "@/types/forms/reset-password"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import resetPassword from "@/actions/auth/reset-password"
import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import Field from "@/components/react-hook-form/fields"
import Form from "@/components/react-hook-form/form-provider"
import FormHead from "@/components/react-hook-form/form/form-head"
import FormReturnLink from "@/components/react-hook-form/form/form-return-link"
import FormSubmitButton from "@/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "@/components/react-hook-form/rhf-custom-input"
import handleServerResponse from "@/lib/utils/helper-functions/handleServerResponse"
import routes from "@/routes/routes"
import { defaultValuesResetPassword as defaultValues, ResetPasswordSchema } from "@/types/forms/reset-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockKeyhole } from "lucide-react"
import { toast } from "sonner"

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
                <Form form={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter Your New Password Below\nFollowed By Your Six Digit Code`)}
                        icon={<LockKeyhole className="h-20 w-20 text-primary" />}
                        title={t("Reset Your Password")}
                    />
                    <div className="flex flex-col gap-2">
                        <AuthFormInput inputName="password" label={t("New Password")} showVisibilityToggle />
                        <AuthFormInput
                            inputName="confirmPassword"
                            label={t("Confirm New Password")}
                            showVisibilityToggle
                        />
                        <Field.Code name="sixDigitCode" />
                        <FormSubmitButton loadingTitle={t("Resetting Password...")} title={t("Reset Password")} />
                    </div>
                </Form>
                <FormReturnLink href={routes.auth.forgotPassword} title={t("Return To Forgot Password")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
