import { alpha, lighten, ListItemButton, styled } from "@mui/material"

export const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
    "&:hover": {
        background: lighten(theme.palette.background.default, 0.05),
        borderRadius: theme.shape.borderRadius,
        boxShadow: `
        0 0.56875rem 3.3rem ${theme.palette.background.default},
        0 0.9975rem 2.4rem ${alpha(theme.palette.common.black, 0.07)},
        0 0.35rem 1rem ${alpha(theme.palette.common.black, 0.1)},
        0 0.225rem 0.8rem ${alpha(theme.palette.common.black, 0.15)}
      `,
        transform: "scale(1.08)",
        zIndex: 6,
    },
    "&:last-child": {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
    },
    background: theme.palette.background.paper,
    position: "relative",

    transform: "scale(1)",

    zIndex: 5,
}))

export const ListItemButtonWrapperLight = styled(ListItemButton)(({ theme }) => ({
    "&:hover": {
        background: alpha(theme.palette.background.paper, 0.06),
    },
    background: "transparent",

    transition: "none",
}))
