"use client"

import { useCallback, useState } from "react"

import Image from "next/image"
import { useSearchParams } from "next/navigation"

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
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import login from "src/actions/auth/login"
import RouterLink from "src/components/base/router-link"
import oAuthProviders from "src/models/forms/common"
import type { LoginRequest } from "src/models/forms/login"
import { defaultValuesLoginRequest, LoginRequestSchema } from "src/models/forms/login"
import type { OAuthProvider } from "src/models/forms/register"
import routes from "src/router/routes"

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
        register: registerInputField,
        handleSubmit: handleSubmitHookForm,
        reset: resetFormFields,
        watch: watchFormField,
        setValue: setFormValue,
        formState: { errors },
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

            if (response.error) {
                toast.error(response.error)
                return
            }

            if (response.success) {
                toast.success(response.success)

                // TODO: temporary fix for refreshing session
                // force all components to recognize the change in auth status
                window.location.href = routes.user.profile
            }
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
                <Typography align="center" variant="h4" gutterBottom>
                    {t("Sign in")}
                </Typography>
                <Typography align="center" variant="body1" fontWeight={400}>
                    {t("Access your account and continue your journey")}
                </Typography>
            </Container>

            {/* Form Content */}
            <Stack mt={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
                {/* OAuth Sign In Buttons */}
                <Container maxWidth="sm">
                    <Stack justifyContent="center" direction={{ xs: "column", sm: "row" }} spacing={1}>
                        {updatedOAuthProviders.map((provider) => (
                            <Button
                                fullWidth
                                disabled={isLoading}
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                                variant="outlined"
                                color="secondary"
                                key={provider.id}
                                onClick={() => onAuth(provider.id).catch(() => {})}
                                startIcon={<Image height={24} width={24} alt={provider.name} src={provider.logo} />}
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
                                key={inputName}
                                register={registerInputField}
                                errors={errors}
                                inputName={inputName as keyof LoginRequest}
                                placeholder={inputName}
                                watchFormField={watchFormField}
                                setFormValue={setFormValue}
                            />
                        ))}

                        {/* Recover Password Link and Clear Form Button */}
                        <Grid xs={12}>
                            <Box alignItems="center" display="flex" justifyContent="space-between">
                                <Link component={RouterLink} href={routes.index} underline="hover">
                                    {t("Recover password")}
                                </Link>

                                {/* Reset Form Button */}
                                <Button
                                    disabled={isLoading}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => resetFormFields()}
                                >
                                    {t("Clear Form")}
                                </Button>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid xs={12}>
                            <Button disabled={isLoading} variant="contained" type="submit" size="large" fullWidth>
                                {isLoading ? t("Signing In") : t("Sign in")}
                            </Button>
                        </Grid>

                        {/* Sign Up Link */}
                        <Grid xs={12} textAlign="center">
                            <Typography component="span" color="text.secondary">
                                {t("Not a Member yet?")}
                            </Typography>{" "}
                            <Link component={RouterLink} href={routes.auth.register} underline="hover" fontWeight={500}>
                                {t("Sign up")}
                            </Link>
                        </Grid>

                        {/* Error Alert */}
                        {errors.root && (
                            <Grid xs={12}>
                                <Alert variant="outlined" severity="error">
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
