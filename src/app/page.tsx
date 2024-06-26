'use client'

import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AvatarAccordion from 'src/components/application-ui/accordions/avatar/avatar'
import CardsBenefits from 'src/components/application-ui/cards-benefits/cards-benefits'
import FinancialStatus from 'src/components/application-ui/financial-status/financial-status'
import AlternateTabs from 'src/components/application-ui/tabs/alternate/alternate'
import UserTabs from 'src/components/application-ui/tabs/users-listing/user-tabs'
import { users } from 'src/components/application-ui/tabs/users-listing/users-mock-data'
import Container from 'src/components/base/container'
import PageHeading from 'src/components/base/page-heading'
import { MainLayout } from 'src/layouts/main-layout'

function Page() {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <Container>
        <PageHeading
          title="Home Page"
          bottomSection={
            <Box my={2}>
              <Divider sx={{ width: { xs: 1, md: '75%' }, mb: 2 }} />
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {t('This is a sample page')}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {}
              </Typography>
            </Box>
          }
        />
      </Container>

      <Container>
        <AlternateTabs />
      </Container>

      <Container>
        <CardsBenefits />
      </Container>

      <Container>
        <AvatarAccordion />
      </Container>

      <Container>
        <FinancialStatus />
      </Container>
      <Container>
        <UserTabs users={users} />
      </Container>
    </MainLayout>
  )
}

export default Page
