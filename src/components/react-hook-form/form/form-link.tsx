import { Box, Link, Typography } from "@mui/material"

import RouterLink from "src/components/base/router-link"

type FormLinkProps = {
    linkTitle: string
    linkTo: string
    title?: string
}

export default function FormLink(props: FormLinkProps) {
    const { linkTitle, linkTo, title } = props

    return (
        <Box mt={1}>
            {title && (
                <Typography color="text.secondary" component="span">
                    {title}{" "}
                </Typography>
            )}
            <Link component={RouterLink} fontWeight={500} href={linkTo} underline="hover">
                {linkTitle}
            </Link>
        </Box>
    )
}
