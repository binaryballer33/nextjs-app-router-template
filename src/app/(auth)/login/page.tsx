"use client"

import type { SubmitHandler } from "react-hook-form"
import type { LoginRequest } from "src/types/forms/login"
import type { OAuthProvider } from "src/types/forms/register"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesLoginRequest, LoginRequestSchema } from "src/types/forms/login"

import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { useCallback, useState } from "react"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Unstable_Grid2 as Grid,
    Link,
    Stack,
    Typography,
    useTheme,
} from "@mui/material"

import { signIn } from "next-auth/react"

import handleAuthResponse from "src/utils/helper-functions/handleServerResponse"

import login from "src/actions/auth/login"

import RouterLink from "src/components/base/router-link"

import routes from "src/routes/routes"

import LoginFormInput from "./login-form-input"

/*
  TODO: maybe I need this, maybe I don't import { useSession } from "next-auth/react"
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  it doesn't affect the functionality of the app

  You can duplicate the error by toggling the password visibility icon in the register or login form
*/
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()

    const loginError = searchParams.get("error")
    const oauthLoginError =
        loginError === "OAuthAccountNotLinked" ? "Email Already In Use With A Different Provider" : null

    const theme = useTheme()
    const { t } = useTranslation()

    const {
        formState: { errors },
        handleSubmit: handleSubmitHookForm,
        register: registerInputField,
        reset: resetFormFields,
        setValue: setFormValue,
        watch: watchFormField,
    } = useForm<LoginRequest>({
        defaultValues: defaultValuesLoginRequest,
        resolver: zodResolver(LoginRequestSchema),
    })

    const onAuth = useCallback(
        async (provider: OAuthProvider["id"]): Promise<void> => {
            await signIn(provider, { callbackUrl: routes.nextAuth.defaultLoginRedirect })
            if (loginError) toast.error(oauthLoginError)
        },
        [loginError, oauthLoginError],
    )

    const handleSubmit: SubmitHandler<LoginRequest> = useCallback(
        async (credentials: LoginRequest): Promise<void> => {
            setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
            resetFormFields() // Reset the form to clear the inputs

            const response = await login(credentials) // Call the login action to sign in the user with next auth
            setIsLoading(false)

            handleAuthResponse({ redirectTo: routes.user.profile, response, toast })
        },
        [resetFormFields],
    )

    const inputFields = Object.keys(defaultValuesLoginRequest) // get the text fields from the initial form state
    const isDarkMode = theme.palette.mode === "dark"
    const getLogo = (provider: OAuthProvider) => {
        if (provider.id === "facebook")
            // TODO: fix this later to be a light and dark icon for facebook
            return isDarkMode ? "/placeholders/logo/facebook.svg" : "/placeholders/logo/facebook.svg"

        return provider.logo
    }

    const updatedOAuthProviders = oAuthProviders.map((provider) => ({
        ...provider,
        logo: getLogo(provider),
    }))

    return (
        <form
            onSubmit={handleSubmitHookForm(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", minHeight: "75dvh", padding: "64px 0px" }}
        >
            {/* Form Header */}
            <Container maxWidth="sm">
                <Typography align="center" gutterBottom variant="h4">
                    {t("Sign in")}
                </Typography>
                <Typography align="center" fontWeight={400} variant="body1">
                    {t("Access your account and continue your journey")}
                </Typography>
            </Container>

            {/* Form Content */}
            <Stack alignItems="center" justifyContent="center" mt={{ sm: 3, xs: 2 }} spacing={{ sm: 3, xs: 2 }}>
                {/* OAuth Sign In Buttons */}
                <Container maxWidth="sm">
                    <Stack direction={{ sm: "row", xs: "column" }} justifyContent="center" spacing={1}>
                        {updatedOAuthProviders.map((provider) => (
                            <Button
                                color="secondary"
                                disabled={isLoading}
                                fullWidth
                                key={provider.id}
                                onClick={() => onAuth(provider.id).catch(() => {})}
                                startIcon={<Image alt={provider.name} height={24} src={provider.logo} width={24} />}
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                                variant="outlined"
                            >
                                {t(`Sign in with ${provider.name}`)}
                            </Button>
                        ))}
                    </Stack>
                </Container>

                {/* OAuth / Email Password Divider */}
                <Divider sx={{ width: "75%" }}>
                    <Typography variant="subtitle1">{t("Or Sign In With Email Below")}</Typography>
                </Divider>

                {/* Form Inputs Below */}
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                        {/* Email And Password Inputs */}
                        {inputFields.map((inputName) => (
                            <LoginFormInput
                                errors={errors}
                                inputName={inputName as keyof LoginRequest}
                                key={inputName}
                                placeholder={inputName}
                                register={registerInputField}
                                setFormValue={setFormValue}
                                watchFormField={watchFormField}
                            />
                        ))}

                        {/* Recover Password Link and Clear Form Button */}
                        <Grid xs={12}>
                            <Box alignItems="center" display="flex" justifyContent="space-between">
                                <Link component={RouterLink} href={routes.auth.resetPassword} underline="hover">
                                    {t("Recover Password")}
                                </Link>

                                {/* Reset Form Button */}
                                <Button
                                    disabled={isLoading}
                                    onClick={() => resetFormFields()}
                                    size="small"
                                    variant="outlined"
                                >
                                    {t("Clear Form")}
                                </Button>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid xs={12}>
                            <Button disabled={isLoading} fullWidth size="large" type="submit" variant="contained">
                                {isLoading ? t("Signing In") : t("Sign in")}
                            </Button>
                        </Grid>

                        {/* Sign Up Link */}
                        <Grid textAlign="center" xs={12}>
                            <Typography color="text.secondary" component="span">
                                {t("Not a Member yet?")}
                            </Typography>{" "}
                            <Link component={RouterLink} fontWeight={500} href={routes.auth.register} underline="hover">
                                {t("Sign up")}
                            </Link>
                        </Grid>

                        {/* Error Alert */}
                        {errors.root && (
                            <Grid xs={12}>
                                <Alert severity="error" variant="outlined">
                                    {t(errors.root.message as string)}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Stack>
        </form>
    )
}
