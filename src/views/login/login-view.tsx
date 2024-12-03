"use client"

import type { LoginRequest } from "@/types/forms/login"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import login from "@/actions/auth/login"
import Form from "@/components/react-hook-form/form-provider"
import handleServerResponse from "@/lib/utils/helper-functions/handleServerResponse"
import routes from "@/routes/routes"
import { defaultValuesLoginRequest as defaultValues, LoginRequestSchema } from "@/types/forms/login"
import LoginForm from "@/views/login/blocks/login-form"
import TwoFactorCode from "@/views/login/blocks/two-factor-code"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseAsBoolean, useQueryState } from "nuqs"
import { toast } from "sonner"

/*
  TODO: maybe I need this, maybe I don't import { useSession } from "next-auth/react"
  it doesn't affect the functionality of the app
  You can duplicate the error by toggling the password visibility icon in the register or login form
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
*/
export default function LoginView() {
    const { t } = useTranslation()

    const methods = useForm<LoginRequest>({ defaultValues, resolver: zodResolver(LoginRequestSchema) })
    const { handleSubmit } = methods
    const [showTwoFactorInput, setShowTwoFactorInput] = useQueryState(
        "showTwoFactorInput",
        parseAsBoolean.withDefault(false),
    )

    const onSubmit = handleSubmit(async (formData) => {
        const response = await login(formData)

        // if a 2FA Token is returned from login, set the twoFactorEnabled state to true to display 2FA input
        if ("token" in response) {
            await setShowTwoFactorInput(true)
        } else {
            // if no 2FA Token, user is not using 2FA
            const redirectLocation = "error" in response ? "" : routes.user.profile
            await handleServerResponse({ redirectTo: redirectLocation, response, toast })
        }
    })

    return (
        <Form form={methods} onSubmit={onSubmit}>
            {showTwoFactorInput ? <TwoFactorCode t={t} /> : <LoginForm t={t} />}
        </Form>
    )
}
