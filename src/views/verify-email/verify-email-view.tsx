"use client"

import type { VerifyEmail } from "src/types/forms/verify-email"

import { defaultValuesVerifyEmail, VerifyEmailSchema } from "src/types/forms/verify-email"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import EmailIcon from "@mui/icons-material/Email"

import { Container, Stack } from "@mui/material"

import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"
import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormResendCode from "src/components/react-hook-form/form/form-resend-code"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

import verifyEmailRequest from "src/api/emails/mutations/verify-email"

export default function VerifyEmailView() {
    const { t } = useTranslation()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const methods = useForm<VerifyEmail>({
        defaultValues: defaultValuesVerifyEmail,
        resolver: zodResolver(VerifyEmailSchema),
    })

    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async () => {
        if (!token) {
            toast.error("No Token Found, Try Clicking The Link Again In Your Email, Don't Change The URL")
            return
        }

        const response = await verifyEmailRequest(token)

        if (response.status === 200) toast.success(response.success)
        else toast.error(response.error)
    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <FullScreenCenteredContainer minHeight="80dvh">
                <Container maxWidth="sm">
                    <FormHead
                        description={t(
                            `We've Emailed A 6-digit Confirmation Code. \nPlease Enter The Code In The Box Below To Verify Your Email.`,
                        )}
                        icon={<EmailIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Please Check Your Email!")}
                    />
                    <Stack gap={2}>
                        <AuthFormInput inputName="email" label={t("Email Address")} />
                        <Field.Code name="code" />
                        <FormSubmitButton loadingIndicator={t("Verifying Code...")} title={t("Verify")} />
                    </Stack>
                    <FormResendCode disabled={false} onResendCode={() => {}} value={0} />
                    <FormReturnLink href={routes.auth.login} title={t("Return To Sign In")} />
                </Container>
            </FullScreenCenteredContainer>
        </Form>
    )
}
