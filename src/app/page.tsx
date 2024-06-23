'use client'

import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import AvatarAccordion from 'src/components/accordions/avatar/avatar'
import Container from 'src/components/base/container'
import PageHeading from 'src/components/base/page-heading'
import CardsBenefits from 'src/components/cards-benefits'
import AlternateTabs from 'src/components/tabs/alternate/alternate'
import { MainLayout } from 'src/layouts/main-layout'

function Page() {
  return (
    <MainLayout>
      <Container>
        <PageHeading
          title="Home Page"
          bottomSection={
            <Box my={2}>
              <Divider sx={{ width: '75%', mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
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
    </MainLayout>
  )
}

export default Page
