import type { ReactNode } from "react"

import PropTypes from "prop-types"
import SimpleBar from "simplebar-react"

import { alpha, styled, useTheme } from "@mui/material"

const ScrollbarWrapper = styled(SimpleBar)(() => ({}))

type ScrollbarProps = {
    children?: ReactNode
    dark?: boolean
}

export default function Scrollbar({ children, dark, ...rest }: ScrollbarProps) {
    const theme = useTheme()

    const getBackgroundColorSimpleScrollbar = () => {
        if (dark)
            return theme.palette.mode === "dark"
                ? alpha(theme.palette.neutral[800], 0.8)
                : alpha(theme.palette.neutral[500], 0.8)

        return theme.palette.mode === "dark"
            ? alpha(theme.palette.neutral[800], 0.3)
            : alpha(theme.palette.neutral[300], 0.7)
    }

    const getBackgroundColorSimpleScrollbarHover = () => {
        if (dark)
            return theme.palette.mode === "dark" ? alpha(theme.palette.neutral[400], 0.3) : theme.palette.neutral[400]

        return theme.palette.mode === "dark"
            ? alpha(theme.palette.neutral[800], 0.3)
            : alpha(theme.palette.neutral[300], 0.7)
    }

    return (
        <ScrollbarWrapper
            autoHide
            sx={{
                ".simplebar-scrollbar": {
                    "&::before": {
                        background: getBackgroundColorSimpleScrollbar(),
                        borderRadius: theme.shape.borderRadius,
                    },
                    "&.simplebar-hover": {
                        "&::before": {
                            background: getBackgroundColorSimpleScrollbarHover(),
                        },
                    },
                },

                height: "100%",
            }}
            {...rest}
        >
            {children}
        </ScrollbarWrapper>
    )
}

Scrollbar.propTypes = {
    children: PropTypes.node,
    dark: PropTypes.bool,
}
