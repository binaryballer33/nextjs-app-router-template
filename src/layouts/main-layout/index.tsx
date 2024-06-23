import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { FC, ReactNode } from 'react'
import Footer from './footer/footer'
import { Header } from './header/header'

interface MainLayoutProps {
  children?: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box width={'95%'} m={'auto'}>
      <Header />
      <Box my={2}>{children}</Box>
      <Footer />
    </Box>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
}
