"use client"

import { useCallback, useState } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Unstable_Grid2 as Grid,
    Link,
    Stack,
    Typography,
    useTheme,
} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import register from "src/actions/auth/register"
import RouterLink from "src/components/base/router-link"
import useAuth from "src/hooks/use-auth"
import oAuthProviders from "src/models/forms/common"
import {
    defaultValuesRegisterRequest,
    OAuthProvider,
    RegisterRequest,
    RegisterRequestSchema,
} from "src/models/forms/register"
import routes from "src/router/navigation-routes"
import createSupabaseClient from "src/utils/supabase/client"

import RegisterFormInput from "./register-form-input"

/*
  TODO: there's a mui warning in the chrome dev tools, figuer out how to fix it later,
  it doesn't affect the functionality of the app

  You can duplicate the error by toggling the password visibility icon in the register or login form
*/
export default function RegisterPage() {
    const [supabaseClient] = useState(createSupabaseClient())
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()
    const theme = useTheme()
    const { t } = useTranslation()
    const { checkSession } = useAuth()

    const {
        register: registerInputField,
        handleSubmit: handleSubmitHookForm,
        reset: resetFormFields,
        watch: watchFormField,
        setValue: setFormValue,
        formState: { errors },
    } = useForm<RegisterRequest>({
        defaultValues: defaultValuesRegisterRequest,
        resolver: zodResolver(RegisterRequestSchema),
    })

    const onAuth = useCallback(
        async (provider: OAuthProvider["id"]): Promise<void> => {
            setIsLoading(true)

            const redirectToUrl = new URL(routes.index)
            redirectToUrl.searchParams.set("next", routes.index)

            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: redirectToUrl.href,
                },
            })

            if (error) {
                setIsLoading(false)
                toast.error(error.message)
                return
            }

            window.location.href = data.url
        },
        [supabaseClient],
    )

    const handleSubmit: SubmitHandler<RegisterRequest> = useCallback(
        async (credentials: RegisterRequest): Promise<void> => {
            setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
            resetFormFields() // Reset the form to clear the inputs

            const { data } = await register(credentials)

            setIsLoading(false)

            // will update the user state if supabase has a auth session
            if (data?.session) await checkSession()
            if (data.session?.user) router.push(`${routes.index}`)

            setIsLoading(false)
        },
        [resetFormFields, router, checkSession],
    )

    const handleClearForm = useCallback(() => {
        resetFormFields()
    }, [resetFormFields])

    let inputFields = Object.keys(defaultValuesRegisterRequest) // get the text fields from the initial form state
    inputFields = inputFields.filter((inputName) => inputName !== "terms") // don't create an input field for the terms checkbox

    const isDarkMode = theme.palette.mode === "dark"

    const getLogo = (provider: OAuthProvider) => {
        if (provider.id === "github")
            return isDarkMode ? "/placeholders/logo/github-icon-light.svg" : "/placeholders/logo/github-icon.svg"

        return provider.logo
    }

    const updatedOAuthProviders = oAuthProviders.map((provider) => ({
        ...provider,
        logo: getLogo(provider),
    }))

    return (
        <form
            onSubmit={handleSubmitHookForm(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", padding: "16px 0px" }}
        >
            <Box py={{ xs: 2, sm: 3 }} mx={{ xl: 6 }}>
                {/* Form Header */}
                <Container maxWidth="sm">
                    <Typography align="center" variant="h4" gutterBottom>
                        {t("Create new account")}
                    </Typography>
                    <Typography align="center" variant="body1" fontWeight={400}>
                        {t("Join our platform by creating a new account for exclusive access")}
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
                                    startIcon={<Image height={24} width={24} alt="Google" src={provider.logo} />}
                                >
                                    {t(`Sign up with ${provider.name}`)}
                                </Button>
                            ))}
                        </Stack>
                    </Container>

                    {/* OAuth / Email Password Divider */}
                    <Divider sx={{ width: "75%" }}>
                        <Typography variant="subtitle1">{t("Or Register With Email Below")}</Typography>
                    </Divider>

                    {/* Form Inputs Below */}
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            {/* Input Fields For Firstname, Lastname, Email, Password And Confirm Password */}
                            {inputFields.map((inputName) => (
                                <RegisterFormInput
                                    key={inputName}
                                    register={registerInputField}
                                    watchFormField={watchFormField}
                                    setFormValue={setFormValue}
                                    errors={errors}
                                    inputName={inputName as keyof RegisterRequest}
                                />
                            ))}

                            {/* Terms Conditions And Clear Form Button */}
                            <Grid xs={12}>
                                <Box alignItems="center" display="flex" justifyContent="space-between">
                                    <FormControl error={Boolean(errors.terms)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...registerInputField("terms")}
                                                    name="terms"
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography variant="body1">
                                                    {t("I accept the Terms and Conditions")}
                                                </Typography>
                                            }
                                        />
                                        {errors.terms && <FormHelperText>{errors.terms.message}</FormHelperText>}
                                    </FormControl>

                                    {/* Reset Form Button */}
                                    <Button
                                        disabled={isLoading}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleClearForm}
                                    >
                                        {t("Clear Form")}
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Create Account Button */}
                            <Grid xs={12}>
                                <Button disabled={isLoading} variant="contained" type="submit" size="large" fullWidth>
                                    {t("Create account")}
                                </Button>
                            </Grid>

                            {/* Errors Alert */}
                            {errors.root && (
                                <Grid xs={12}>
                                    <Alert severity="error">{errors.root.message}</Alert>
                                </Grid>
                            )}

                            {/* Already a Member? Link To Login Page */}
                            <Grid xs={12} textAlign="center">
                                <Typography component="span" color="text.secondary">
                                    {t("Already a Member?")}
                                </Typography>{" "}
                                <Link
                                    component={RouterLink}
                                    href={routes.auth.login}
                                    underline="hover"
                                    fontWeight={500}
                                >
                                    {t("Sign in here")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Stack>
            </Box>
        </form>
    )
}
