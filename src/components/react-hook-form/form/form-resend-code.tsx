import type { BoxProps } from "@mui/material/Box"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

type FormResendCodeProps = {
    disabled?: boolean
    onResendCode?: () => void
    value?: number
} & BoxProps

export default function FormResendCode({ disabled, onResendCode, sx, value, ...other }: FormResendCodeProps) {
    return (
        <Box
            sx={{
                alignSelf: "center",
                mt: 3,
                typography: "body2",
                ...sx,
            }}
            {...other}
        >
            {`Don’t have a code? `}
            <Link
                onClick={onResendCode}
                sx={{
                    cursor: "pointer",
                    ...(disabled && {
                        color: "text.disabled",
                        pointerEvents: "none",
                    }),
                }}
                variant="subtitle2"
            >
                Resend {disabled && value && value > 0 && `(${value}s)`}
            </Link>
        </Box>
    )
}
