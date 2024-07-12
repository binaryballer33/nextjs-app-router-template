"use client"

import { ReactNode } from "react"

import { Box } from "@mui/material"
import PropTypes from "prop-types"

import Footer from "./footer/footer"
import Header from "./header/header"

type MainLayoutProps = {
  children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box width="95%" m="auto">
      <Header />
      <Box my={2}>{children}</Box>
      <Footer />
    </Box>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
}
