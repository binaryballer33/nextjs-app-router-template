import { alpha, styled, Table, TableHead, TableRow } from "@mui/material"

export const TableWrapper = styled(Table)(({ theme }) => ({
    "tbody tr td": {
        "& > div": {
            position: "relative",
            zIndex: 5,
        },
        "&::before": {
            borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
            borderTop: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
            content: '""',
            height: "100%",
            left: 0,
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 4,
        },
        "&:first-of-type:before": {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderLeft: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
            borderTopLeftRadius: theme.shape.borderRadius,
        },
        "&:last-child:before": {
            borderBottomRightRadius: theme.shape.borderRadius,
            borderRight: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
            borderTopRightRadius: theme.shape.borderRadius,
        },
        border: 0,
        position: "relative",
    },
    "tbody tr:hover td::before": {
        background: alpha(theme.palette.primary.main, 0.02),
        borderColor: `${alpha(theme.palette.common.black, 0.25)} !important`,
    },
    "thead tr th": {
        border: 0,
    },
}))

export const TableRowDivider = styled(TableRow)(({ theme }) => ({
    height: theme.spacing(2),
}))

export const TableHeadWrapper = styled(TableHead)(({ theme }) => ({
    ".MuiTableCell-root": {
        background: "transparent",
        color: theme.palette.neutral[700],
        fontSize: theme.typography.pxToRem(16),
        fontWeight: "normal",
        padding: theme.spacing(2),
        textTransform: "none",
    },
    ".MuiTableRow-root": {
        background: "transparent",
    },
}))
