"use client"

import type { BoxProps } from "@mui/material/Box"

import clsx from "clsx"

import Box from "@mui/material/Box"
import styled from "@mui/material/styles/styled"

type Ellipsis = { ellipsis: number }

type HeaderProps = {
    ellipsis?: boolean
} & BoxProps

const StyledBox = styled(Box, { shouldForwardProp: (prop) => prop !== "ellipsis" })<Ellipsis>(({ ellipsis }) => ({
    ...(ellipsis && { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }),
}))

export function H1(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h1"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={30}
            fontWeight={700}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function H2(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h2"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={25}
            fontWeight={700}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function H3(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h3"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={20}
            fontWeight={700}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function H4(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h4"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={17}
            fontWeight={600}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function H5(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h5"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={16}
            fontWeight={600}
            lineHeight={1}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function H6(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="h6"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={14}
            fontWeight={600}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function Paragraph(props: HeaderProps) {
    const { children, className, ellipsis, ...others } = props

    return (
        <StyledBox
            component="p"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={14}
            fontWeight={400}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function Small(props: HeaderProps) {
    const { children, className, ellipsis = false, ...others } = props

    return (
        <StyledBox
            component="small"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={12}
            fontWeight={400}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function Span(props: HeaderProps) {
    const { children, className, ellipsis = false, ...others } = props

    return (
        <StyledBox
            component="span"
            ellipsis={ellipsis ? 1 : 0}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}

export function Tiny(props: HeaderProps) {
    const { children, className, ellipsis = false, ...others } = props

    return (
        <StyledBox
            component="small"
            ellipsis={ellipsis ? 1 : 0}
            fontSize={10}
            fontWeight={400}
            {...(className && { className: clsx({ [className]: true }) })}
            {...others}
        >
            {children}
        </StyledBox>
    )
}
