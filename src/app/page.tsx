'use client'

import { Box, Divider, Switch, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AvatarAccordion from 'src/components/application-ui/accordions/avatar/avatar'
import CardsBenefits from 'src/components/application-ui/cards-benefits/cards-benefits'
import FinancialStatus from 'src/components/application-ui/financial-status/financial-status'
import AlternateTabs from 'src/components/application-ui/tabs/alternate/alternate'
import UserTabs from 'src/components/application-ui/tabs/users-listing/user-tabs'
import Container from 'src/components/base/container'
import PageHeading from 'src/components/base/page-heading'
import { mock_users } from 'src/mocks/user-mocks'

function Page() {
  const { t } = useTranslation()

  return (
    <>
      <Container>
        <PageHeading
          title="Home Page"
          bottomSection={
            <Box my={2}>
              <Divider sx={{ width: { xs: 1, md: '75%' }, mb: 2 }} />
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {t('This is a sample page')}
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

      {/* <Container>
        <FinancialStatus />
      </Container>
      <Container>
        <UserTabs users={mock_users} />
      </Container> */}
    </>
  )
}

export default Page
