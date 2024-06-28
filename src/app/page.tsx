'use client'

import { Box, Button, Divider, Typography } from '@mui/material'
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

/*
  TODO:
  at the moment, when a user logs in or signs out, the page does not update the header icon to reflect the user's logged-in status
  it will update the header icon only if i specifically refresh the page or if i make the page children of the MainLayout component
  but if i put the main layout component in the layout.tsx file, then the page will not update the header icon to reflect the user's logged-in status
*/
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
        <UserTabs users={users} />
      </Container> */}
    </>
  )
}

export default Page
