"use client"

import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import EmailIcon from "@mui/icons-material/Email"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"

import FullScreenCenteredContainer from "src/components/base/flex-box/full-height-width-centered-container"
import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormResendCode from "src/components/react-hook-form/form/form-resend-code"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"

import routes from "src/routes/routes"

import verifyEmailRequest from "src/api/emails/mutations/verify-email"

const VerifySchema = zod.object({
    code: zod
        .string()
        .min(1, { message: "Code Is Required!" })
        .min(6, { message: "Code Must Be At Least 6 Characters!" }),
    email: zod
        .string()
        .min(1, { message: "Email Is Required!" })
        .email({ message: "Email Must Be A Valid Email Address!" }),
})

export type VerifySchemaType = zod.infer<typeof VerifySchema>

export default function VerifyEmailView() {
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
        <FullScreenCenteredContainer minHeight="75dvh">
            <Box width={{ lg: "40%", md: "60%", sm: "75%", xs: "95%" }}>
                <FormHead
                    description={`We've Emailed A 6-digit Confirmation Code. \nPlease Enter The Code In The Box Below To Verify Your Email.`}
                    icon={<EmailIcon sx={{ color: "primary.main", fontSize: 80 }} />}
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
            </Box>
        </FullScreenCenteredContainer>
    )
}
