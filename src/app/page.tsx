'use client'

import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import AvatarAccordion from 'src/components/application-ui/accordions/avatar/avatar'
import CardsBenefits from 'src/components/application-ui/cards-benefits/cards-benefits'
import FinancialStatus from 'src/components/application-ui/financial-status/financial-status'
import AlternateTabs from 'src/components/application-ui/tabs/alternate/alternate'
import Container from 'src/components/base/container'
import PageHeading from 'src/components/base/page-heading'
import { MainLayout } from 'src/layouts/main-layout'

function Page() {
  return (
    <MainLayout>
      <Container>
        <PageHeading
          title="Home Page"
          bottomSection={
            <Box my={2}>
              <Divider sx={{ width: { xs: 1, md: '75%' }, mb: 2 }} />
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                This is a sample page
              </Typography>
            </Box>
          }
        />
      </Container>

      <Container>
        <AvatarAccordion />
      </Container>

      <Container>
        <AlternateTabs />
      </Container>

      <Container>
        <CardsBenefits />
      </Container>

      <Container>
        <FinancialStatus />
      </Container>
    </MainLayout>
  )
}

export default Page
