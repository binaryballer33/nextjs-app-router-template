'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { register } from 'src/actions/auth/register'
import { RouterLink } from 'src/components/base/router-link'
import { ButtonIcon } from 'src/components/base/styles/button-icon'
import { useAuth } from 'src/hooks/use-auth'
import { oAuthProviders } from 'src/models/forms/common'
import { defaultValuesRegisterForm, OAuthProvider, RegisterForm, RegisterSchema } from 'src/models/forms/register'
import { routes } from 'src/router/navigation-routes'
import { createClient as createSupabaseClient } from 'src/utils/supabase/client'

function RegisterPage(): JSX.Element {
  const [supabaseClient] = useState(createSupabaseClient())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const theme = useTheme()
  const { t } = useTranslation()
  const { checkSession } = useAuth()

  const {
    register: registerInputField,
    handleSubmit,
    reset: resetFormFields,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: defaultValuesRegisterForm,
    resolver: zodResolver(RegisterSchema),
  })

  const onAuth = useCallback(
    async (provider: OAuthProvider['id']): Promise<void> => {
      setIsLoading(true)

      const redirectToUrl = new URL(routes.index)
      redirectToUrl.searchParams.set('next', routes.index)

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

  const onSubmit = useCallback(
    async (credentials: RegisterForm): Promise<void> => {
      setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
      resetFormFields() // Reset the form to clear the inputs

      const { data } = await register(credentials)

      setIsLoading(false)

      if (data?.session) {
        await checkSession()

        router.refresh()
        return
      }

      if (data.user) {
        router.push(`${routes.index}`)
        return
      }

      setIsLoading(false)
    },
    [resetFormFields, router, checkSession],
  )

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const isDarkMode = theme.palette.mode === 'dark'
  const updatedOAuthProviders = oAuthProviders.map((provider) => ({
    ...provider,
    logo:
      provider.id === 'github'
        ? isDarkMode
          ? '/placeholders/logo/github-icon-light.svg'
          : '/placeholders/logo/github-icon.svg'
        : provider.logo,
  }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: '16px 0px' }}>
      <Box py={{ xs: 2, sm: 3 }} mx={{ xl: 6 }}>
        {/* Form Header */}
        <Container maxWidth="sm">
          <Typography align="center" variant="h4" gutterBottom>
            {t('Create new account')}
          </Typography>
          <Typography align="center" variant="body1" fontWeight={400}>
            {t('Join our platform by creating a new account for exclusive access')}
          </Typography>
        </Container>

        {/* Form Content */}
        <Stack mt={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
          {/* OAuth Sign In Buttons */}
          <Container maxWidth="sm">
            <Stack justifyContent="center" direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              {updatedOAuthProviders.map((provider) => (
                <Button
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    whiteSpace: 'nowrap',
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
          <Divider flexItem>
            <Typography variant="subtitle1">{t('Or Register With Email Below')}</Typography>
          </Divider>

          {/* Form Inputs Below */}
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              {/* First And Last Name */}
              <Grid xs={12}>
                <FormControl fullWidth>
                  <Typography variant="h6" gutterBottom component="label" htmlFor="firstname-input" fontWeight={500}>
                    {t('Full name')}
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid xs={12} sm={6}>
                      <FilledInput
                        error={Boolean(errors.firstname)}
                        hiddenLabel
                        {...registerInputField('firstname')}
                        id="firstname-input"
                        fullWidth
                        placeholder={t('First name')}
                      />

                      {errors.firstname && <FormHelperText>{errors.firstname.message}</FormHelperText>}
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <FilledInput
                        error={Boolean(errors.lastname)}
                        hiddenLabel
                        {...registerInputField('lastname')}
                        fullWidth
                        id="lastname-input"
                        placeholder={t('Last name')}
                      />
                      {errors.lastname && <FormHelperText>{t(errors.lastname.message as string)}</FormHelperText>}
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              {/* Email Input */}
              <Grid xs={12}>
                <FormControl fullWidth error={Boolean(errors.email)}>
                  <Typography variant="h6" gutterBottom component="label" htmlFor="email-input" fontWeight={500}>
                    {t('Email')}
                  </Typography>
                  <FilledInput
                    {...registerInputField('email')}
                    type="email"
                    hiddenLabel
                    id="email-input"
                    placeholder={t('Write your email')}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                  />
                  {errors.email && <FormHelperText>{t(errors.email.message as string)}</FormHelperText>}
                </FormControl>
              </Grid>

              {/* Password Input */}
              <Grid xs={12}>
                <FormControl fullWidth error={Boolean(errors.password)}>
                  <Typography variant="h6" gutterBottom component="label" htmlFor="password-input" fontWeight={500}>
                    {t('Password')}
                  </Typography>
                  <FilledInput
                    {...registerInputField('password')}
                    type={showPassword ? 'text' : 'password'}
                    hiddenLabel
                    id="password-input"
                    placeholder={t('Write your password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineRoundedIcon fontSize="small" />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonIcon
                          variant="outlined"
                          color="secondary"
                          sx={{ mr: -0.3 }}
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                        </ButtonIcon>
                      </InputAdornment>
                    }
                  />
                  {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
              </Grid>

              {/* Confirm Password Input */}
              <Grid xs={12}>
                <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="confirmPassword-input"
                    fontWeight={500}
                  >
                    {t('Confirm Password')}
                  </Typography>
                  <FilledInput
                    {...registerInputField('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    hiddenLabel
                    id="confirmPassword-input"
                    placeholder={t('Write your password again')}
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineRoundedIcon fontSize="small" />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonIcon
                          variant="outlined"
                          color="secondary"
                          sx={{ mr: -0.3 }}
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                        </ButtonIcon>
                      </InputAdornment>
                    }
                  />
                  {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
                </FormControl>
              </Grid>

              {/* Terms And Conditions */}
              <Grid xs={12}>
                <Box alignItems="center" display="flex" justifyContent="space-between">
                  <FormControl error={Boolean(errors.terms)}>
                    <FormControlLabel
                      control={<Checkbox {...registerInputField('terms')} name="terms" color="primary" />}
                      label={
                        <>
                          <Typography variant="body1">{t('I accept the Terms and Conditions')}</Typography>
                        </>
                      }
                    />
                    {errors.terms && <FormHelperText>{errors.terms.message}</FormHelperText>}
                  </FormControl>
                </Box>
              </Grid>

              {/* Create Account Button */}
              <Grid xs={12}>
                <Button disabled={isLoading} variant="contained" type="submit" size="large" fullWidth>
                  {t('Create account')}
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
                  {t('Already a Member?')}
                </Typography>{' '}
                <Link component={RouterLink} href={routes.auth.login} underline="hover" fontWeight={500}>
                  {t('Sign in here')}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Stack>
      </Box>
    </form>
  )
}

export default RegisterPage
