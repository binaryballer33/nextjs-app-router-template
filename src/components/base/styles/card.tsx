import { alpha, Card, CardActions, CardHeader, Divider, styled } from "@mui/material"

export const DividerLight = styled(Divider)(({ theme }) => ({
    borderColor:
        theme.palette.mode === "dark"
            ? alpha(theme.palette.common.white, 0.12)
            : alpha(theme.palette.common.white, 0.2),
}))

export const CardHeaderLight = styled(CardHeader)(({ theme }) => ({
    "& .MuiCardHeader-content": {
        "& .MuiCardHeader-subheader": {
            color: alpha(theme.palette.common.white, 0.7),
        },

        color: theme.palette.common.white,
    },

    backgroundColor:
        theme.palette.mode === "dark"
            ? alpha(theme.palette.common.white, 0.04)
            : alpha(theme.palette.common.white, 0.08),
}))

export const CardActionsLight = styled(CardActions)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? alpha(theme.palette.common.white, 0.04)
            : alpha(theme.palette.common.white, 0.08),
}))

export const CardAddActionDashed = styled(Card)(({ theme }) => ({
    ".MuiCardActionArea-root": {
        "&:hover .MuiCardActionArea-focusHighlight": {
            opacity: 0.01,
        },

        height: "100%",
    },
    "& > .MuiSvgIcon-root": {
        color: theme.palette.neutral[600],
    },

    "& > .MuiTypography-root": {
        color: theme.palette.neutral[800],
    },

    "&:hover": {
        "& > .MuiSvgIcon-root": {
            color: theme.palette.neutral[800],
        },

        "& > .MuiTypography-root": {
            color: theme.palette.neutral[900],
        },

        borderColor: theme.palette.primary.main,
    },

    border: `${alpha(theme.palette.secondary.main, 0.2)} dashed 2px`,

    height: "100%",
}))
