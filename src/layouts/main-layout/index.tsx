"use client"

import type { ReactNode } from "react"

import PropTypes from "prop-types"

import { Box } from "@mui/material"

import Footer from "./footer/footer"
import Header from "./header/header"

type MainLayoutProps = {
    children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box m="auto" width="95%">
            <Header />
            <Box my={2}>{children}</Box>
            <Footer />
        </Box>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node,
}
