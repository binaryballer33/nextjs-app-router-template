"use client"

import type { TFunction } from "i18next"
import type { OAuthProvider } from "src/types/forms/common"

import { useSearchParams } from "next/navigation"

import { useCallback } from "react"

import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@mui/material"

import { signIn } from "next-auth/react"

import routes from "src/routes/routes"

type OAuthButtonProps = {
    provider: OAuthProvider
    t: TFunction<"translation", undefined>
}

export default function OAuthButton(props: OAuthButtonProps) {
    const { provider, t } = props
    const { icon: Icon } = provider

    const {
        formState: { isSubmitting },
    } = useFormContext()

    const searchParams = useSearchParams()

    const loginError = searchParams.get("error")
    const oauthLoginError =
        loginError === "OAuthAccountNotLinked" ? "Email Already In Use With A Different Provider" : null

    const onAuth = useCallback(
        async (oauthProvider: OAuthProvider["id"]): Promise<void> => {
            await signIn(oauthProvider, { redirectTo: routes.nextAuth.defaultLoginRedirect })
            if (loginError) toast.error(oauthLoginError)
        },
        [loginError, oauthLoginError],
    )

    return (
        <Button
            color="primary"
            disabled={isSubmitting}
            fullWidth
            key={provider.id}
            onClick={() => onAuth(provider.id).catch(() => {})}
            startIcon={<Icon />}
            sx={{ fontSize: 16, whiteSpace: "nowrap" }}
            variant="outlined"
        >
            {t(`Access With ${provider.name}`)}
        </Button>
    )
}
