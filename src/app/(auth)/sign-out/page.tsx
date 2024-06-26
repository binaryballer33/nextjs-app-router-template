'use client'

import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function SignOutPage() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Box
      minHeight={'100dvh'}
      minWidth={'100dvw'}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="body1">{t("You've Been Successfully Signed Out")}</Typography>
      <Button variant="contained" onClick={() => router.push('/')}>
        {t('Go back to the home page')}
      </Button>
    </Box>
  )
}

export default SignOutPage
