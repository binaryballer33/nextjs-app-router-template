"use client"

import type { SubmitHandler } from "react-hook-form"
import type { OAuthProvider, RegisterRequest } from "src/types/forms/register"

import oAuthProviders from "src/types/forms/common"
import { defaultValuesRegisterRequest, RegisterRequestSchema } from "src/types/forms/register"

import Image from "next/image"
import { useRouter } from "next/navigation"

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

import register from "src/actions/auth/register"

import RouterLink from "src/components/base/router-link"

import routes from "src/router/routes"

import RegisterFormInput from "./register-form-input"

/*
  TODO: there's a mui warning in the chrome dev tools, figure out how to fix it later,
  it doesn't affect the functionality of the app

  You can duplicate the error by toggling the password visibility icon in the register or login form
*/
export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const theme = useTheme()
    const { t } = useTranslation()
    const router = useRouter()

    const {
        formState: { errors },
        handleSubmit: handleSubmitHookForm,
        register: registerInputField,
        reset: resetFormFields,
        setValue: setFormValue,
        watch: watchFormField,
    } = useForm<RegisterRequest>({
        defaultValues: defaultValuesRegisterRequest,
        resolver: zodResolver(RegisterRequestSchema),
    })

    const onAuth = useCallback(async (provider: OAuthProvider["id"]): Promise<void> => {
        await signIn(provider)
    }, [])

    const handleSubmit: SubmitHandler<RegisterRequest> = useCallback(
        async (credentials: RegisterRequest): Promise<void> => {
            setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
            resetFormFields() // Reset the form to clear the inputs

            const response = await register(credentials)
            setIsLoading(false)

            if (response.status === 200) {
                toast.success(response.success)
                router.push(routes.auth.login)
            }
            if (response.status === 400 || response.status === 500) toast.error(response.error, { duration: 5000 })
        },
        [resetFormFields, router],
    )

    const handleClearForm = useCallback(() => {
        resetFormFields()
    }, [resetFormFields])

    const inputFields = ["firstName", "lastName", "email", "password", "confirmPassword"]

    const isDarkMode = theme.palette.mode === "dark"

    const getLogo = (provider: OAuthProvider) => {
        if (provider.id === "facebook")
            // TODO: get light and dark facebook icon later
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
            style={{ display: "flex", flexDirection: "column", padding: "16px 0px" }}
        >
            <Box mx={{ xl: 6 }} py={{ sm: 3, xs: 2 }}>
                {/* Form Header */}
                <Container maxWidth="sm">
                    <Typography align="center" gutterBottom variant="h4">
                        {t("Create new account")}
                    </Typography>
                    <Typography align="center" fontWeight={400} variant="body1">
                        {t("Join our platform by creating a new account for exclusive access")}
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
                                    startIcon={<Image alt="Google" height={24} src={provider.logo} width={24} />}
                                    sx={{
                                        whiteSpace: "nowrap",
                                    }}
                                    variant="outlined"
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
                                    errors={errors}
                                    inputName={inputName as keyof RegisterRequest}
                                    key={inputName}
                                    register={registerInputField}
                                    setFormValue={setFormValue}
                                    watchFormField={watchFormField}
                                />
                            ))}

                            {/* Terms Conditions And Clear Form Button */}
                            <Grid xs={12}>
                                <Box alignItems="center" display="flex" justifyContent="space-between">
                                    {/* <FormControl error={Boolean(errors.terms)}> */}
                                    {/*    <FormControlLabel */}
                                    {/*        control={ */}
                                    {/*            <Checkbox */}
                                    {/*                {...registerInputField("terms")} */}
                                    {/*                name="terms" */}
                                    {/*                color="primary" */}
                                    {/*            /> */}
                                    {/*        } */}
                                    {/*        label={ */}
                                    {/*            <Typography variant="body1"> */}
                                    {/*                {t("I accept the Terms and Conditions")} */}
                                    {/*            </Typography> */}
                                    {/*        } */}
                                    {/*    /> */}
                                    {/*    {errors.terms && <FormHelperText>{errors.terms.message}</FormHelperText>} */}
                                    {/* </FormControl> */}

                                    {/* Reset Form Button */}
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleClearForm}
                                        size="small"
                                        variant="outlined"
                                    >
                                        {t("Clear Form")}
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Create Account Button */}
                            <Grid xs={12}>
                                <Button disabled={isLoading} fullWidth size="large" type="submit" variant="contained">
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
                            <Grid textAlign="center" xs={12}>
                                <Typography color="text.secondary" component="span">
                                    {t("Already a Member?")}
                                </Typography>{" "}
                                <Link
                                    component={RouterLink}
                                    fontWeight={500}
                                    href={routes.auth.login}
                                    underline="hover"
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
