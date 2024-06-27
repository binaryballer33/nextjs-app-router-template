'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FilledInput,
  FormControl,
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
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { login } from 'src/actions/auth/login'
import { RouterLink } from 'src/components/base/router-link'
import { ButtonIcon } from 'src/components/base/styles/button-icon'
import { useAuth } from 'src/hooks/use-auth'
import { oAuthProviders } from 'src/models/forms/common'
import { defaultValuesLoginForm, LoginForm, LoginFormSchema } from 'src/models/forms/login'
import { OAuthProvider } from 'src/models/forms/register'
import { routes } from 'src/router/navigation-routes'
import { createClient as createSupabaseClient } from 'src/utils/supabase/client'

function LoginPage(): React.JSX.Element {
  const [supabaseClient] = useState(createSupabaseClient())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const theme = useTheme()
  const { t } = useTranslation()
  const { checkSession } = useAuth()

  const {
    register,
    handleSubmit,
    reset: resetFormFields,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: defaultValuesLoginForm,
    resolver: zodResolver(LoginFormSchema),
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
    async (credentials: LoginForm): Promise<void> => {
      setIsLoading(true) // Set loading state to true for disabling buttons and changing UI
      resetFormFields() // Reset the form to clear the inputs

      await login(credentials) // Call the login action to sign in the user with supabase

      setIsLoading(false)
      await checkSession() // Check the session to update the user context with our auth provider

      router.refresh() // Refresh the page to update the UI with the new user context, only doing rereshes on auth changes
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '75dvh', padding: '64px 0px' }}
    >
      {/* Form Header */}
      <Container maxWidth="sm">
        <Typography align="center" variant="h4" gutterBottom>
          {t('Sign in')}
        </Typography>
        <Typography align="center" variant="body1" fontWeight={400}>
          {t('Access your account and continue your journey')}
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
                {t(`Sign in with ${provider.name}`)}
              </Button>
            ))}
          </Stack>
        </Container>

        {/* OAuth / Email Password Divider */}
        <Divider flexItem>
          <Typography variant="subtitle1">{t('Sign In With Email Below')}</Typography>
        </Divider>

        {/* Form Inputs Below */}
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            {/* Email Input */}
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.email)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="email-input" fontWeight={500}>
                  {t('Email')}
                </Typography>
                <FilledInput
                  autoComplete="username"
                  hiddenLabel
                  {...register('email')}
                  type="email"
                  id="email-input"
                  placeholder="Email Address"
                  startAdornment={
                    <InputAdornment position="start">
                      <MailOutlineRoundedIcon fontSize="small" />
                    </InputAdornment>
                  }
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
                  autoComplete="current-password"
                  hiddenLabel
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password-input"
                  placeholder={t('Write your password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonIcon
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: -0.8 }}
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </ButtonIcon>
                    </InputAdornment>
                  }
                />
                {errors.password && <FormHelperText>{t(errors.password.message as string)}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Recover Password Link */}
            <Grid xs={12}>
              <Box alignItems="center" display="flex" justifyContent="space-between">
                <Link component={RouterLink} href={routes.index} underline="hover">
                  {t('Recover password')}
                </Link>
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid xs={12}>
              <Button disabled={isLoading} variant="contained" type="submit" size="large" fullWidth>
                {isLoading ? t('Signing In') : t('Sign in')}
              </Button>
            </Grid>

            {/* Sign Up Link */}
            <Grid xs={12} textAlign="center">
              <Typography component="span" color="text.secondary">
                {t('Not a Member yet?')}
              </Typography>{' '}
              <Link component={RouterLink} href={routes.auth.register} underline="hover" fontWeight={500}>
                {t('Sign up')}
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

export default LoginPage
