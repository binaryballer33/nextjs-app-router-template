import { Accordion, alpha, styled } from "@mui/material"

export const AccordionAlternate = styled(Accordion)(({ theme }) => ({
    ".MuiAccordionDetails-root": {
        paddingLeft: theme.spacing(4.5),
    },

    ".MuiAccordionSummary-root": {
        ".MuiAccordionSummary-expandIconWrapper": {
            marginRight: theme.spacing(1),
        },
        "&:hover": {
            backgroundColor:
                theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : theme.palette.neutral[25],
        },
        borderRadius: "inherit",

        flexDirection: "row-reverse",

        paddingLeft: theme.spacing(1),
    },

    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },

    "&.Mui-expanded": {
        ".MuiAccordionSummary-root": {
            backgroundColor: "inherit",
        },
    },
}))

export const AccordionPrimary = styled(Accordion)(({ theme }) => ({
    ".MuiAccordionSummary-expandIconWrapper": {
        "&.Mui-expanded": {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        alignItems: "center",
        border:
            theme.palette.mode === "dark"
                ? `1px solid ${theme.palette.neutral[300]}`
                : `1px solid ${theme.palette.neutral[800]}`,
        borderRadius: "50%",
        display: "flex",
        height: 32,
        justifyContent: "center",

        width: 32,
    },

    ".MuiAccordionSummary-root, .MuiAccordionDetails-root": {
        borderLeft: "3px solid transparent",
    },

    ".MuiAccordionSummary-root:hover": {
        backgroundColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : theme.palette.neutral[25],
    },

    "&.Mui-expanded": {
        ".MuiAccordionSummary-content .MuiTypography-root": {
            color: theme.palette.primary.main,
        },

        ".MuiAccordionSummary-root, .MuiAccordionDetails-root": {
            borderLeftColor: theme.palette.primary.main,
        },

        backgroundColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : theme.palette.neutral[25],
    },
}))

export const AccordionPlus = styled(Accordion)(({ theme }) => ({
    ".MuiAccordionSummary-content": {
        padding: theme.spacing(1, 0),
    },

    ".MuiAccordionSummary-expandIconWrapper": {
        alignItems: "center",
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral[100] : theme.palette.neutral[900],
        border:
            theme.palette.mode === "dark"
                ? `1px solid ${theme.palette.neutral[100]}`
                : `1px solid ${theme.palette.neutral[900]}`,
        borderRadius: "50%",
        color: theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.common.white,
        display: "flex",
        height: 28,
        justifyContent: "center",
        width: 28,
    },

    ".MuiAccordionSummary-root": {
        ".MuiAccordionSummary-expandIconWrapper": {
            marginRight: theme.spacing(1),
        },
        border: "none",
        flexDirection: "row-reverse",

        padding: theme.spacing(0),
    },
    backgroundColor: "transparent",
    border: "none",

    boxShadow: "none",
}))

export const AccordionMinimal = styled(Accordion)(({ theme }) => ({
    ".MuiAccordionDetails-root": {
        padding: 0,
    },
    ".MuiAccordionSummary-root": {
        "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.neutral[50], 0.02) : "neutral.50",
        },
        borderRadius: theme.shape.borderRadius,
        flexDirection: "row",
        margin: theme.spacing(2),
        paddingLeft: theme.spacing(1),

        paddingRight: theme.spacing(1),
    },

    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(180deg)",
    },

    borderRadius: "0px !important",

    boxShadow: "none",
}))
