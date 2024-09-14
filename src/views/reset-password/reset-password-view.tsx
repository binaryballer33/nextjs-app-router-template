"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import LockIcon from "@mui/icons-material/Lock"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"

import FullScreenCenteredContainer from "src/components/base/full-height-width-centered-container"
import Field from "src/components/react-hook-form/fields"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"

import routes from "src/routes/routes"

export type ResetPasswordSchemaType = zod.infer<typeof ResetPasswordSchema>

export const ResetPasswordSchema = zod.object({
    email: zod
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Email must be a valid email address!" }),
})

export default function ResetPasswordView() {
    const defaultValues = { email: "" }

    const methods = useForm<ResetPasswordSchemaType>({
        defaultValues,
        resolver: zodResolver(ResetPasswordSchema),
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
    } = methods

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            console.info("DATA", data)
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <FullScreenCenteredContainer minHeight="75dvh">
            <Box width={{ lg: "40%", md: "60%", sm: "75%", xs: "95%" }}>
                <FormHead
                    description={`Please Enter The Email Address Associated With Your Account And We'll Email You A Link To Reset Your Password.`}
                    icon={<LockIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                    title="Forgot Your Password?"
                />
                <Form methods={methods} onSubmit={onSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Field.Text
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                            label="Email Address"
                            name="email"
                            placeholder="example@gmail.com"
                            variant="standard"
                        />

                        <LoadingButton
                            fullWidth
                            loading={isSubmitting}
                            loadingIndicator="Sending..."
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Send Request
                        </LoadingButton>
                    </Box>
                </Form>
                <FormReturnLink href={routes.auth.login} />
            </Box>
        </FullScreenCenteredContainer>
    )
}
