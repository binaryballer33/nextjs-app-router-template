"use client"

import { useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import EmailIcon from "@mui/icons-material/Email"
import LoadingButton from "@mui/lab/LoadingButton"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z as zod } from "zod"

import verifyEmailRequest from "src/api/emails/mutations/verify-email"
import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"
import routes from "src/router/routes"

import FormHead from "./blocks/form-head"
import FormResendCode from "./blocks/form-resend-code"
import FormReturnLink from "./blocks/form-return-link"

export type VerifySchemaType = zod.infer<typeof VerifySchema>

const VerifySchema = zod.object({
    code: zod
        .string()
        .min(1, { message: "Code is required!" })
        .min(6, { message: "Code must be at least 6 characters!" }),
    email: zod
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Email must be a valid email address!" }),
})

export default function VerifyEmailPage() {
    const defaultValues = { code: "", email: "" }

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const methods = useForm<VerifySchemaType>({
        resolver: zodResolver(VerifySchema),
        defaultValues,
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = handleSubmit(async () => {
        if (!token) {
            toast.error("No Token Found, Try Clicking The Link Again In Your Email, Don't Change The URL")
            return
        }

        const response = await verifyEmailRequest(token)

        if (response.success) toast.success(response.success)
        else toast.error(response.error)
    })

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "75dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FormHead
                icon={<EmailIcon />}
                title="Please Check Your Email!"
                description={`We've Emailed A 6-digit Confirmation Code. \nPlease Enter The Code In The Box Below To Verify Your Email.`}
            />

            <Form methods={methods} onSubmit={onSubmit}>
                <Box gap={3} display="flex" flexDirection="column">
                    <Field.Text
                        name="email"
                        label="Email Address"
                        placeholder="example@gmail.com"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                    />

                    <Field.Code name="code" />

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        loading={isSubmitting}
                        loadingIndicator="Verifying Code..."
                    >
                        Verify
                    </LoadingButton>
                </Box>
            </Form>

            <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

            <FormReturnLink href={routes.auth.login} />
        </Container>
    )
}
