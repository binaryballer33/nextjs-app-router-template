import { alpha, styled, Tabs } from "@mui/material"

export const TabsLineAlternate = styled(Tabs)(({ theme }) => ({
    ".MuiTabs-indicator": {
        "&::after": {
            background: theme.palette.secondary.main,
            borderRadius: "inherit",
            content: '""',
            height: 4,
            width: 34,
        },
        backgroundColor: "transparent",
        display: "flex",
        height: 4,

        justifyContent: "center",
    },
}))

export const TabsRounded = styled(Tabs)(({ theme }) => ({
    ".MuiTab-root": {
        "&.Mui-selected": {
            color: theme.palette.primary.main,
        },
        fontWeight: 600,
        height: 44,
        margin: theme.spacing(0, 0.5),
        minHeight: 0,
        padding: theme.spacing(1, 2),

        transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
    },
    ".MuiTabs-flexContainer": {
        position: "relative",
        zIndex: 6,
    },

    ".MuiTabs-indicator": {
        "&::after": {
            background: alpha(theme.palette.primary.main, 0.08),
            borderRadius: theme.shape.borderRadius,
            content: '""',
            height: 44,
            position: "absolute",
            top: -44,
            width: "100%",
        },
        backgroundColor: "transparent",
        display: "flex",
        height: 0,

        justifyContent: "center",
    },

    ".MuiTabs-scroller": {
        overflow: "visible !important",
    },

    minHeight: 0,
    overflow: "visible",
}))

export const TabsShadow = styled(Tabs)(({ theme }) => ({
    ".MuiTab-root": {
        "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
        },
        fontWeight: 600,
        height: 44,
        margin: theme.spacing(0, 0.5),
        minHeight: 0,
        padding: theme.spacing(1, 2),

        transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
    },
    ".MuiTabs-flexContainer": {
        position: "relative",
        zIndex: 6,
    },

    ".MuiTabs-indicator": {
        "&::after": {
            background: theme.palette.primary.main,
            borderRadius: "inherit",
            boxShadow: theme.shadows[1],
            content: '""',
            height: 44,
            position: "absolute",
            top: -44,
            width: "100%",
        },
        backgroundColor: "transparent",
        display: "flex",
        height: 0,

        justifyContent: "center",
    },

    ".MuiTabs-scroller": {
        overflow: "visible !important",
    },

    minHeight: 0,
    overflow: "visible",
}))

export const TabsAlternate = styled(Tabs)(({ theme }) => ({
    ".MuiTab-root": {
        "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
        },
        fontWeight: 600,
        height: 44,
        margin: theme.spacing(0, 0.5),
        minHeight: 0,
        padding: theme.spacing(1, 2),

        transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
    },
    ".MuiTabs-flexContainer": {
        position: "relative",
        zIndex: 6,
    },

    ".MuiTabs-indicator": {
        "&::after": {
            background: theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[1],
            content: '""',
            height: 44,
            position: "absolute",
            top: -44,
            width: "100%",
        },
        backgroundColor: "transparent",
        display: "flex",
        height: 0,

        justifyContent: "center",
    },

    ".MuiTabs-scroller": {
        overflow: "visible !important",
    },

    minHeight: 0,
    overflow: "visible",
}))

export const TabsPills = styled(Tabs)(({ theme }) => ({
    ".MuiTab-root": {
        "&.Mui-selected": {
            color: theme.palette.primary.main,
        },
        fontSize: 13,
        fontWeight: 600,
        margin: theme.spacing(0),
        minHeight: 0,
        padding: theme.spacing(1, 2),
        textTransform: "uppercase",

        transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
    },
    ".MuiTabs-flexContainer": {
        position: "relative",
        zIndex: 6,
    },

    ".MuiTabs-indicator": {
        "&::after": {
            background: alpha(theme.palette.primary.main, 0.08),
            borderRadius: theme.shape.borderRadius * 5,
            content: '""',
            height: 38,
            position: "absolute",
            top: -38,
            width: "100%",
        },
        backgroundColor: "transparent",
        display: "flex",
        height: 0,

        justifyContent: "center",
    },

    ".MuiTabs-scroller": {
        overflow: "visible !important",
    },

    minHeight: 0,
    overflow: "visible",
}))
