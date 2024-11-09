import { alpha, LinearProgress, linearProgressClasses, styled } from "@mui/material"

export const LinearProgressDark = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },

    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
}))

export const LinearProgressBlack = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: theme.palette.common.black,
        borderRadius: theme.shape.borderRadius,
    },

    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.black, 0.2),
    },
}))

export const LinearProgressDarkAlternate = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
    },

    height: 16,
}))

export const LinearProgressBlackAlternate = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: theme.palette.common.black,
        borderRadius: theme.shape.borderRadius,
    },
    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.black, 0.2),
    },

    height: 16,
}))

export const LinearProgressAlternate = styled(LinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.root}`]: {
        backgroundColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[100], 0.12) : theme.palette.neutral[200],
        boxShadow:
            theme.palette.mode === "dark"
                ? `inset 0 1px 3px ${alpha(theme.palette.neutral[900], 0.35)}`
                : `inset 0 1px 2px ${theme.palette.neutral[400]}`,
    },

    height: 16,
}))

export const LinearProgressSlim = styled(LinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.root}`]: {
        backgroundColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[800], 0.88) : theme.palette.neutral[200],
    },

    height: 8,
}))

export const LinearProgressGradientGreen = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: "linear-gradient(135deg, #FFF720 0%, #3CD500 100%)",
    },

    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.12),
    },
}))

export const LinearProgressGradientOrange = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    },

    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.12),
    },
}))

export const LinearProgressGradientPurple = styled(LinearProgress)(({ theme }) => ({
    [`& .${linearProgressClasses.bar}`]: {
        background: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    },

    [`&.${linearProgressClasses.root}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.12),
    },
}))
