import type { LinkProps } from "@mui/material/Link"
import type { ReactNode } from "react"

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

import Link from "@mui/material/Link"

import RouterLink from "src/components/base/router-link"

type FormReturnLinkProps = {
    href: string
    icon?: ReactNode
    label?: ReactNode
} & LinkProps

export default function FormReturnLink({ href, icon, label, sx, ...other }: FormReturnLinkProps) {
    return (
        <Link
            color="inherit"
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
            variant="subtitle2"
            {...other}
        >
            {icon || <ArrowBackIosNewIcon width={16} />}
            {label || "Return to sign in"}
        </Link>
    )
}
