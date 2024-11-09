import type { LinkProps } from "@mui/material/Link"
import type { ReactNode } from "react"

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

import Link from "@mui/material/Link"

import RouterLink from "src/components/base/router-link"

type FormReturnLinkProps = {
    href: string
    icon?: ReactNode
    title: string
} & LinkProps

export default function FormReturnLink({ href, icon, sx, title, ...other }: FormReturnLinkProps) {
    return (
        <Link
            color="primary"
            component={RouterLink}
            href={href}
            sx={{
                alignItems: "center",
                display: "inline-flex",
                gap: 0.5,
                mt: 3,
                mx: "auto",
                ...sx,
            }}
            underline="hover"
            variant="subtitle2"
            {...other}
        >
            {icon || <ArrowBackIosNewIcon fontSize="small" />}
            {title}
        </Link>
    )
}
