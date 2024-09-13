"use client"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import EmailIcon from "@mui/icons-material/Email"

import LoadingButton from "@mui/lab/LoadingButton"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"

import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"

import verifyEmailRequest from "src/api/emails/mutations/verify-email"
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
        defaultValues,
        resolver: zodResolver(VerifySchema),
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
    } = methods

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
        <Container
            maxWidth="sm"
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "75dvh",
            }}
        >
            <FormHead
                description={`We've Emailed A 6-digit Confirmation Code. \nPlease Enter The Code In The Box Below To Verify Your Email.`}
                icon={<EmailIcon />}
                title="Please Check Your Email!"
            />

            <Form methods={methods} onSubmit={onSubmit}>
                <Box display="flex" flexDirection="column" gap={3}>
                    <Field.Text
                        InputLabelProps={{ shrink: true }}
                        label="Email Address"
                        name="email"
                        placeholder="example@gmail.com"
                        variant="outlined"
                    />

                    <Field.Code name="code" />

                    <LoadingButton
                        fullWidth
                        loading={isSubmitting}
                        loadingIndicator="Verifying Code..."
                        size="large"
                        type="submit"
                        variant="outlined"
                    >
                        Verify
                    </LoadingButton>
                </Box>
            </Form>

            <FormResendCode disabled={false} onResendCode={() => {}} value={0} />

            <FormReturnLink href={routes.auth.login} />
        </Container>
    )
}
