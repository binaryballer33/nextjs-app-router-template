import type { ReactNode } from "react"

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import type { LinkProps } from "@mui/material/Link"
import Link from "@mui/material/Link"

import RouterLink from "src/components/base/router-link"

type FormReturnLinkProps = LinkProps & {
    href: string
    icon?: ReactNode
    label?: ReactNode
}

export default function FormReturnLink({ sx, href, children, label, icon, ...other }: FormReturnLinkProps) {
    return (
        <Link
            component={RouterLink}
            href={href}
            color="inherit"
            variant="subtitle2"
            sx={{
                mt: 3,
                gap: 0.5,
                mx: "auto",
                alignItems: "center",
                display: "inline-flex",
                ...sx,
            }}
            {...other}
        >
            {icon || <ArrowBackIosNewIcon width={16} />}
            {label || "Return to sign in"}
        </Link>
    )
}
